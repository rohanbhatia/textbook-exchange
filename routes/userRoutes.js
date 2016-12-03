var Ad = require('../models/ad');
var User = require('../models/user');

// app.post('/signup', users.createUser);
// signup
exports.createUser = function(req, res) {

	console.log("createUser");

	var user_email = req.body["email"];

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

				console.log("User created");
			});
			return res.send("Thank you for joining us. Please login to get started!");
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

		console.log(req.body.token);
		console.log(req.body.email);

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

	console.log(req.query);

	var user_email = req.query.email;

	User.find({email: user_email}, function(err, user) {

		if (err) throw err;

		//user found
		if (user[0]) {

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
// NEW! logout - TODO complete in routes
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
