var Ad = require('../models/ad');
var User = require('../models/user');

// app.post('/signup', users.createUser); 
// signup
exports.createUser = function(req, res) {
	console.log("createUser");

};

// app.post('/login', users.userLogin);  
// login
exports.userLogin = function(req, res) {
	console.log('userLogin');

};

// app.get('/user', users.getUserInfo); 
// Get user info / object
exports.getUserInfo = function(req, res) {
	console.log('getUserInfo');

};

// app.post('/editUser', users.editUserInfo);  
// Post new user edit
exports.editUserInfo = function(req, res) {
	console.log('editUserInfo');

};

// app.post('/removeUser', users.removeUser);  
// Remove user
exports.removeUser = function(req, res) {
	console.log('removeUser');

};




