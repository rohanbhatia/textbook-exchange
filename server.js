
var express = require('express');
var routes = require('./user');
var routes = require('./ads');
var bodyParser = require('body-parser');

var app = express();
app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/'));


// The request body is received on GET or POST.
// A middleware that just simplifies things a bit.
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));



app.post('/login', user.login);  // login
app.post('/signup', user.user);  // signup
app.get('/user', user.editUser); // Get user info / object
app.post('/editUser', user.editUser);  // Post new user edit
app.post('/removeUser', user.removeUser);  // Remove user

app.get('/ads', ads.getads);  // Get all the post objects - also get individual post via fname
app.post('/bid', ads.bid);        // Bid
app.delete('/deleteAd', ads.deleteAd); // Delete
app.post('/newAd', ads.newAd);     // Bid
app.post('/editAd', ads.editAd);   // Edit ads




app.listen(process.env.PORT || 3000);
console.log('Listening on port 3000');