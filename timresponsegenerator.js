
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
    	console.log("1");
    	console.log(req.query.id);
    	if (req.query.id==1234){
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
    	}else if(req.query.id==4632){
    		var testBook = new Object();
	        testBook["title"] = "Go Tell It On the Mountain";
	        testBook["id"] = "4632";
	        testBook["author"] = "Pentatonix";
	        testBook["description"] = "Short Desc";
	        testBook["posteddate"] = "11-21-2054";
	        testBook["bid"] = "50";
	        testBook["isbn"] = "77823428";
	        testBook["courses"] = ["lol001"];
	        list.push(testBook);
	        result["ads"] = list;
    	}else if(req.query.id==1294){
    		var testBook = new Object();
	        testBook["title"] = "Carol of the Bells";
	        testBook["id"] = "1294";
	        testBook["author"] = "Pentatonix";
	        testBook["description"] = "your baby boy will save our sons and daughters?your baby boy will save our sons and daughters?your baby boy will save our sons and daughters?your baby boy will save our sons and daughters?your baby boy will save our sons and daughters?your baby boy will save our sons and daughters?";
	        testBook["posteddate"] = "99-99-7063";
	        testBook["bid"] = "99999999";
	        testBook["isbn"] = "78238024";
	        testBook["courses"] = [];
	        list.push(testBook);
	        result["ads"] = list;
    	}else{
    		console.log("not found");
    		var testBook = new Object();
	        testBook["title"] = "Book Not Found";
	        testBook["id"] = "Book Not Found";
	        testBook["author"] = "Book Not Found";
	        testBook["description"] = "Book Not Found";
	        testBook["posteddate"] = "Book Not Found";
	        testBook["bid"] = "N/A";
	        testBook["isbn"] = "Book Not Found";
	        list.push(testBook);
	        result["ads"] = list;
    	}
    }else if(req.query.email != null){
    	// Hardcoded to return results regardless of email
        var testBook = new Object();
        testBook["title"] = "Go Tell It On the Mountain";
        testBook["id"] = "4632";
        testBook["author"] = "Pentatonix";
        testBook["description"] = "Short Desc";
        testBook["posteddate"] = "11-21-2054";
        testBook["bid"] = "50";
        testBook["isbn"] = "77823428";
        testBook["courses"] = ["lol001"];
        list.push(testBook);
        result["ads"] = list;

        var testBook = new Object();
        testBook["title"] = "Carol of the Bells";
        testBook["id"] = "1294";
        testBook["author"] = "Pentatonix";
        testBook["description"] = "your baby boy will save our sons and daughters?your baby boy will save our sons and daughters?your baby boy will save our sons and daughters?your baby boy will save our sons and daughters?your baby boy will save our sons and daughters?your baby boy will save our sons and daughters?";
        testBook["posteddate"] = "99-99-7063";
        testBook["bid"] = "99999999";
        testBook["isbn"] = "78238024";
        testBook["courses"] = [];
        list.push(testBook);
        result["ads"] = list;
    }else{
    	// Get all the ads
    	// Hardcoded for ID 1234 for testing
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

        // Hardcoded for ID 1234 for testing
        var testBook = new Object();
        testBook["title"] = "Go Tell It On the Mountain";
        testBook["id"] = "4632";
        testBook["author"] = "Pentatonix";
        testBook["description"] = "Short Desc";
        testBook["posteddate"] = "11-21-2054";
        testBook["bid"] = "50";
        testBook["isbn"] = "77823428";
        testBook["courses"] = ["lol001"];
        list.push(testBook);
        result["ads"] = list;

        // Hardcoded for ID 1234 for testing
        var testBook = new Object();
        testBook["title"] = "Carol of the Bells";
        testBook["id"] = "1294";
        testBook["author"] = "Pentatonix";
        testBook["description"] = "your baby boy will save our sons and daughters?your baby boy will save our sons and daughters?your baby boy will save our sons and daughters?your baby boy will save our sons and daughters?your baby boy will save our sons and daughters?your baby boy will save our sons and daughters?";
        testBook["posteddate"] = "99-99-7063";
        testBook["bid"] = "99999999";
        testBook["isbn"] = "78238024";
        testBook["courses"] = [];
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