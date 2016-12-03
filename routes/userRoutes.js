var Ad = require('../models/ad');
var User = require('../models/user');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://donotreply_uoftextbook%40timothylock.ca:eDtU;Y;g4}NgBz$M@smtp.zoho.com');

// app.post('/signup', users.createUser);
// signup
exports.createUser = function(req, res) {

	console.log("createUser");

	var user_email = req.body["email"];

	if(req.body["password"].length <= 5){
		return res.send(("Your password length must be 5 characters or greater"));
	}

	User.find({email: user_email}, function(err, user) {

		if (err) throw err;

		//If user found with the given email, prevent overwrite of the existing data
		if (user[0]) {
			return res.send((user_email + " is already in use."));
		}
		else {
			//create new user
			var newUser = User({
				email: req.body["email"],
				password: req.body["password"],
				first_name: req.body["first_name"],
				last_name: req.body["last_name"],
				admin_status: false
			});

			//save new user to db
			newUser.save(function(err) {
				if (err) throw err;

				try {
					// Send the new sign up email out
					var emailContent = "Hello " + req.body.first_name + "! \n\n" +
							"Thank you for joining us! This email is to confirm that an account for you has been created " +
							"with this email and password '" + req.body.password + "'. " +
							"Please visit us to get started!" +
							"\n\nCheers,\nThe UofTextbook Team";

					var mailOptions = {
							from: '"UofTextbook" <donotreply_uoftextbook@timothylock.ca>', // sender address
							to: user_email, // list of receivers
							subject: 'Welcome to UofTextbook!', // Subject line
							text: emailContent, // plaintext body
							html: ("<p>Hello  "+ req.body.first_name + "!<br><br>" +
							"Thank you for joining us! This email is to confirm that an account for you has been created " +
							"with this email and password '" + req.body.password + "'. " +
							"Please visit us to get started!<br><br>Cheers,<br>The UofTextbook Team"
							+ "</p>") // html body
					};

					// send mail with defined transport object
					transporter.sendMail(mailOptions, function(error, info){
							if(error){
									return console.log(error);
							}
							console.log('Message sent: ' + info.response);
					});
				}
				catch (err) {
					console.log("Error Sending Email");
				}

				return res.send("Thank you for joining us. Please check your email to get started!");
				console.log("User created");
			});

		}
	});
};

// app.post('/login', users.userLogin);
// login
exports.userLogin = function(req, res) {

	console.log('userLogin');

	var user_email = req.body["email"];

	User.find({email: user_email}, function(err, user) {

		if (err) throw err;

		//user found
		if (user[0]) {
			var given_password = req.body["password"];
			var real_password = user[0].password;

			//correct password
			if (given_password == real_password) {

				//user is not already logged in
				if (!user[0].logged_in) {
					//generate token
					var token = "" + Math.random();
					user[0].session_token = token;
					user[0].logged_in = true;

					user[0].save(function(err)	{

						if (err) throw err;

						return res.json({"token": user[0].session_token,
															"adminStatus": user[0].admin_status,
															"email": user[0].email});
					});

				}
				//user already logged in
				else {
				return res.json({"token": user[0].session_token,
														"adminStatus": user[0].admin_status,
														"email": user[0].email});
				}
			}
			//wrong password
			else {
				res.send("Failure: Wrong password\n");
			}
		}
		//user not found
		else {
			res.send("Failure: No such user\n");
		}

	});
};

//app.post('/resetPassword', users.resetPassword);
// Reset password if user forgets their password
exports.resetPassword = function(req, res) {
	console.log('resetPassword');
	var user_email = req.body.email;
	User.find({email: user_email}, function(err, user) {

		if (err) throw err;
		// User found
		if (user[0]) {
			var charset = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
			var newPword = "";
			for (var i = 0, n = charset.length; i < 10; i++) {
				newPword += charset.charAt(Math.floor(Math.random() * n));
			}
			// Save new password
			user[0].password = newPword;
			user[0].save(function(err)	{

				if (err) throw err;
				try {
					// Send the reset password out
					var emailContent = "Hello " + user[0].first_name + "! \n\n" +
							"A request to reset your password has been made. Your new " +
							"password is '" + newPword + "'. Please reset your password once " +
							"you have logged in. If you did not make this request "
							+ "please disregard this message.\n\nCheers,\nThe UofTextbook Team";

					var mailOptions = {
					    from: '"UofTextbook" <donotreply_uoftextbook@timothylock.ca>', // sender address
					    to: user_email, // list of receivers
					    subject: 'UofTextbook Reset Password', // Subject line
					    text: emailContent, // plaintext body
					    html: ("<p>Hello  "+ user[0].first_name + "!<br><br>" +
							"A request to reset your password has been made. Your new " +
							"password is '" + newPword + "'. Please reset your password once " +
							"you have logged in. <br>If you did not make this request "
							+ "please disregard this message.<br><br>Cheers,<br>The UofTextbook Team"
							+ "</p>") // html body
					};

					// send mail with defined transport object
					transporter.sendMail(mailOptions, function(error, info){
					    if(error){
						return console.log(error);
					    }
					    console.log('Message sent: ' + info.response);
					});
				}
				catch (err) {
					console.log("Error sending email");
				}

				res.send("Success");
			});

		}
		else {
			res.send(user_email + " not found! Please sign up to join us!");
		}
	});
}

// app.get('/user', users.getUserInfo);
// Get user info / object
exports.getUserInfo = function(req, res) {

	console.log('getUserInfo');

	var user_email = req.query.email;

	//case where user is provided
	if (user_email) {

		User.find({email: user_email}, function(err, user) {

			if (err) throw err;

			//user found
			if (user[0]) {
		    	return res.json({"users": [user[0]]});
			}
			//user not found
			else {
				res.send("Failure: No such user\n");
			}

		});
	}
	//User not provided
	else {

		User.find({}, function(err, user) {

			if (err) throw err;

			//user found
			if (user[0]) {
		    	return res.json({"users": user});
			}
			//user not found
			else {
				res.send("Failure\n");
			}

		});
	}
};

// app.post('/editUser', users.editUserInfo);
// Post new user edit
exports.editUserInfo = function(req, res) {

	console.log('editUserInfo');

	var user_email = req.body["email"];

	User.find({email: user_email}, function(err, user) {

		if (err) throw err;

		user[0].email = req.body.email;
		user[0].first_name = req.body.first_name;
		user[0].last_name = req.body.last_name;
		user[0].password = req.body.password;
		user[0].save(function(err)	{

			if (err) throw err;

			res.send("Success");
		});

	});
};

// app.delete('/removeUser', users.removeUser);
// Remove user
exports.removeUser = function(req, res) {

	console.log('removeUser');

	var user_email = req.query.email;

	User.find({email: user_email}, function(err, user) {

		if (err) throw err;

		//user found
		if (user[0]) {
	
			Ad.find({owner_email: user_email}, function(err, ads) {

				if (err) throw err;

				for (var index in ads) {

					ads[index].remove(function(err) {

						if (err) throw err;
					});
				}
			});
			
			user[0].remove(function(err) {

				if (err) throw err;

				res.send("Success\n");

			});
		}
		//user not found
		else {
			res.send("Failure\n");
		}

	});
};

//app.post('/logout', users.userLogout);
exports.userLogout = function(req, res) {

	console.log("userLogout");

	try {

		var user_email = req.body.email;
		var token = req.body.token;

		User.find({email: user_email}, function(err, user) {

			if (err) throw err;

			//user found, token is valid
			if ((user[0]) && (token == user[0].session_token)) {

				user[0].logged_in = false;
				user[0].session_token = "";
				user[0].save(function(err) {

					if (err) throw err;

					res.send("Successfully logged out\n");
				});
			}
			//user not found or invalid token
			else {
				res.send("Failure\n");
			}

		});
	}
	catch(err) {
		res.send("Failure\n");
	}
}
