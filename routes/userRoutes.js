var Ad = require('../models/ad');
var User = require('../models/user');

// app.post('/signup', users.createUser); 
// signup
exports.createUser = function(req, res) {
	
	console.log("createUser");

	//create new user
	var newUser = User({
		email: req.body["email"],
		password: req.body["password"],
		first_name: req.body["first_name"],
		last_name: req.body["last_name"],
		admin_status: req.body["admin_status"]
	});

	//save new user to db
	newUser.save(function(err) {
		if (err) throw err;

		console.log("User created");
	});

	res.send("Success\n");

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
					res.send(user[0].session_token);
				}
				//user already logged in
				else {
					res.send("Failure: User is already logged in\n");
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

	//use req.query

	var user_email = req.query.email;

	User.find({email: user_email}, function(err, user) {
		
		if (err) throw err;

		//user found
		if (user[0]) {
			res.send(user[0]);
		}
		//user not found
		else {
			res.send("Failure: No such user\n");
		}
		
	});

};

// app.post('/editUser', users.editUserInfo);  
// Post new user edit
exports.editUserInfo = function(req, res) {
	
	console.log('editUserInfo');
	
	var user_email = req.body["email"];

	User.find({email: user_email}, function(err, user) {
		
		if (err) throw err;
		
		user[0].email = req.body["new_email"];
		user[0].first_name = req.body["first_name"];
		user[0].last_name = req.body["last_name"];
		user[0].password = req.body["password"];
		user[0].save(function(err)	{
			
			if (err) throw err;

			res.send("Success\n");
		});

	});
};

// app.delete('/removeUser', users.removeUser);  
// Remove user
exports.removeUser = function(req, res) {
	
	console.log('removeUser');

	var user_email = req.body["email"];

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




	//print db to see if user added
	//User.find({}, function (err, users) {
		
	//	if (err) throw err;
	//	
	//	console.log(users);
	//});





