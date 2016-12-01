
var express = require('express');
var users = require('./routes/userRoutes');
var ads = require('./routes/adRoutes');
var comments = require('./routes/commentRoutes');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();
app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/'));


// The request body is received on GET or POST.
// A middleware that just simplifies things a bit.
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

// Set up a mail transporter
// create reusable transporter object using the default SMTP transport
// Please DON'T share this with anybody. Even though its just temporary for our project, I don't need google blacklisting me
var transporter = nodemailer.createTransport('smtps://donotreply_uoftextbook%40timothylock.ca:eDtU;Y;g4}NgBz$M@smtp.zoho.com');

/* Example calling 
// setup e-mail data with unicode symbols
var mailOptions = {
    from: '"Fred Foo ?" <foo@blurdybloop.com>', // sender address
    to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plaintext body
    html: '<b>Hello world ?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});
*/

app.post('/signup', users.createUser);  // signup
app.post('/login', users.userLogin);  // login
app.get('/user', users.getUserInfo); // Get user info / object
app.post('/editUser', users.editUserInfo);  // Post new user edit
app.delete('/removeUser', users.removeUser);  // Remove user
//app.post('/logout', users.userLogout); // NEW! logout - TODO complete in routes

app.post('/newComment', comments.addComment); // post a new comment
app.get('/getAdComments', comments.getAdComments); //send all comment ids for 1 ad
app.get('/getComment', comments.getComment); //send all info for 1 comment

app.get('/ads', ads.getAds);  // Get all the post objects - also get individual post via fname
app.post('/bid', ads.postBid);        // Bid
app.delete('/deleteAd', ads.deleteAd); // Delete
app.post('/newAd', ads.createNewAd);     // Create New Ad
app.post('/editAd', ads.editAd);   // Edit ad

app.listen(process.env.PORT || 3000);
console.log('Listening on port 3000');
