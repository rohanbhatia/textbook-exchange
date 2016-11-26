
var express = require('express');
var users = require('./routes/userRoutes');
var ads = require('./routes/adRoutes');
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


app.post('/signup', users.createUser);  // signup
app.post('/login', users.userLogin);  // login
app.get('/user', users.getUserInfo); // Get user info / object
app.post('/editUser', users.editUserInfo);  // Post new user edit
app.delete('/removeUser', users.removeUser);  // Remove user

app.get('/ads', ads.getAds);  // Get all the post objects - also get individual post via fname
app.post('/bid', ads.postBid);        // Bid
app.delete('/deleteAd', ads.deleteAd); // Delete
app.post('/newAd', ads.createNewAd);     // Create New Ad
app.post('/editAd', ads.editAd);   // Edit ad

app.listen(process.env.PORT || 3000);
console.log('Listening on port 3000');