
var express = require('express');
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

// Returns a list of applicants
function getads(req, res) {
    // Shared by all queries. Construct structure
    var result = new Object();
    var list = [];

    // Specific queries
    if(req.query.id != null){
    	// Hardcoded for ID 1234 for testing
    	console.log("getting ad (sepcific)");
        var testBook = new Object();
        testBook["title"] = "Mary, Did You Know?";
        testBook["id"] = "1234";
        testBook["author"] = "Pentatonix";
        testBook["description"] = "Mary did you know that your baby boy will one day walk on water? Mary did you know that your baby boy will save our sons and daughters?";
        testBook["posteddate"] = "11-21-2014";
        testBook["bid"] = "53";
        testBook["isbn"] = "77858024";
        testBook["courses"] = ["csc101", "apl235", "ece234"];
        list.push(testBook);
        result["ads"] = list;
    }
    return res.json(result);
}

//app.post('/login', user.login);  // login
//app.post('/signup', user.user);  // signup
//app.get('/user', user.editUser); // Get user info / object
//app.post('/editUser', user.editUser);  // Post new user edit
//app.post('/removeUser', user.removeUser);  // Remove user

app.get('/ads', getads);  // Get all the post objects - also get individual post via fname
//app.post('/bid', ads.bid);        // Bid
//app.delete('/deleteAd', ads.deleteAd); // Delete
//app.post('/newAd', ads.newAd);     // Bid
//app.post('/editAd', ads.editAd);   // Edit ads




app.listen(process.env.PORT || 3000);
console.log('Listening on port 3000');