
var express = require('express');
var users = require('./userRoutes');
var ads = require('./adRoutes');
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



app.post('/login', users.login);  // login
app.post('/signup', users.user);  // signup
app.get('/user', users.editUser); // Get user info / object
app.post('/editUser', users.editUser);  // Post new user edit
app.post('/removeUser', users.removeUser);  // Remove user

app.get('/ads', ads.getads);  // Get all the post objects - also get individual post via fname
app.post('/bid', ads.bid);        // Bid
app.delete('/deleteAd', ads.deleteAd); // Delete
app.post('/newAd', ads.newAd);     // Bid
app.post('/editAd', ads.editAd);   // Edit ads




app.listen(process.env.PORT || 3000);
console.log('Listening on port 3000');