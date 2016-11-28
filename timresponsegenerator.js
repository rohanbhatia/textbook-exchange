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

// Returns a user
function getUser(req, res) {
    // Shared by all queries. Construct structure
    var result = new Object();
    var list = [];

    // Single User
    if(req.query.email != null){
        var testUser = new Object();
        testUser["firstName"] = "Hardcoded User";
        testUser["lastName"] = "Best Last Name";
        testUser["password"] = "12345";
        testUser["email"] = "test@test.ca";
        testUser["adminStatus"] = "user";
        list.push(testUser);
        result["users"] = list;
    }else{
      // ALL Users
      var testUser = new Object();
        testUser["firstName"] = "Hardcoded User";
        testUser["lastName"] = "Best Last Name";
        testUser["password"] = "12345";
        testUser["email"] = "test@test.ca";
        testUser["adminStatus"] = "user";
        list.push(testUser);
        result["users"] = list;

        var testUser = new Object();
        testUser["firstName"] = "N00b";
        testUser["lastName"] = "chezburger";
        testUser["password"] = "12345";
        testUser["email"] = "noob@test.ca";
        testUser["adminStatus"] = "admin";
        list.push(testUser);
        result["users"] = list;
    }
    return res.json(result);
}

// Returns a list of ads
function getads(req, res) {
    // Shared by all queries. Construct structure
    var result = new Object();
    var list = [];

    // Specific queries
    if(req.query.id != null){
    	if (req.query.id==1234){
    		var testBook = new Object();
          testBook["email"] = "lukedanes@starshollow.com";
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
    }else if(req.query.course != null){
        // Hardcoded to return results regardless of course
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
    }else if(req.query.title != null){
        // Hardcoded to return results regardless of title
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


var comments = {"comments": [{"posteddatetime": "11-11-2016",
                  "email": "jameds@hotmail.com", "comments": "Hi mom!"},
            {"posteddatetime": "11-13-2016", "email": "mememaster@hotmail.com",
             "comments": "What a dank book"}]};
function getComments(req, res){
    // Specific queries
    if(req.query.id != null){
        return res.json(comments);
    }


}
/**
function getComments(req, res){
  // Shared by all queries. Construct structure
  var result = new Object();
  var list = [];

    // Specific queries
    if(req.query.id != null){
        var testComment = new Object();
          testComment["posteddatetime"] = "11-11-2016";
          testComment["email"] = "jameds@hotmail.com";
          testComment["comments"] = "Hi mom!";
          list.push(testComment);


          var testComment = new Object();
          testComment["posteddatetime"] = "11-13-2016";
          testComment["email"] = "mememaster@hotmail.com";
          testComment["comments"] = "What a dank book";
          list.push(testComment);
          result["comments"] = list;
    }
    return res.json(result);

}
*/

function deleteAd(req, res){
    return res.send("Success");
}

var userListing = {"users": [
  {"firstName": "Luke", "lastName": "Danes", "password": "coffee",
    "email": "lukedanes@starshollow.com", "adminStatus": "user"
	},   {"firstName": "Taylor", "lastName": "Doose", "password": "festival",
      "email": "taylordoose@starshollow.com", "adminStatus": "admin"
  	}
]  };

function login(req, res) {
  var users = JSON.parse(JSON.stringify(userListing));
  let email = req.body.email;
  let password = req.body.password;
  let validEmail = false;
  let validPword = false;
  for (let i in users["users"]) {
    let user = users["users"][i];
    if (user["email"] == email && user["password"] == password) {
      validEmail = true;
      validPword = true;
      // generate a token and send it, along with admin status
      // below is hardcoded for testing purposes
      var token = "A23XD4FG";
      // Add token to the user for tracking.
      user["token"] = token;
      return res.json({"token": token, "adminStatus": user["adminStatus"],
                        "email": user["email"]});
    }
    else if (user["email"] == email) {
      validEmail = true;
      break;
    }
  }

  if (validEmail) {
    return res.send("Incorrect password, please try again!");
  }
  else {
    return res.send("Email not found, please try again!");
  }
}


function signup(req, res) {
  let uniqueEmail = true;
  while (uniqueEmail) {
    for (let i in userListing["users"]) {
      let user = userListing["users"][i];
      if (user["email"] == req.body.email) {
        uniqueEmail = false;
      }
    }
    break;
  }
  if (uniqueEmail) {
    let newUser = {"firstName": req.body.firstName, "lastName": req.body.lastName,
                    "password": req.body.password, "email": req.body.email,
                    "adminStatus": "user"};
    userListing["users"].push(newUser);
    // TODO Also need to write the new user to the db!
    //console.log(JSON.stringify(userListing));
    res.send("Thank you for joining us. Please login to get started!");
  }
  else {
    res.send((req.body.email + " is already in use."));
  }

}


function editUser(req, res) {
  if (req.body.token == "A23XD4FG"){
        return res.send("Success");
  }
  else {
    return res.send("Failure");
  }

}


function newAd(req, res) {
  if (req.body.token == "A23XD4FG"){
        // TODO actual fn must generate the posteddate!
        return res.send("Success");
  }
  else {
    return res.send("Failure");
  }
}

function bid(req, res) {
  // Use token to determine the email of the bidder and store their email w/ the bid somehow
  // TODO actual fn must check if req.body.bid is higher than current!
  if (req.body.bid > 10) {
    return res.send("Bid submitted!");
  }
  else {
    return res.send("Bid entered is too low!");
  }
}


function addComment(req, res) {
  let datetime = new Date();
  let commentObj = {"id": req.body.id, "posteddatetime": datetime, "email": req.body.email,
                    "comments": req.body.comment};
  comments["comments"].push(commentObj);
  res.send("Success");
}


function acceptBid(req, res) {
  // server has to verify with token, send emails (poster, bidder) and delete the post
  res.send("Success");
}


app.post('/login', login); // Login
app.post('/signup', signup);  // signup
app.get('/user', getUser); // Get user info / object
app.post('/editUser', editUser);  // Post new user edit
//app.delete('/removeUser', user.removeUser);  // Remove user

app.get('/ads', getads);  // Get all the post objects - also get individual post via fname
app.post('/bid', bid);        // Bid
app.delete('/deleteAd', deleteAd); // Delete
app.post('/newAd', newAd);     // Bid
//app.post('/editAd', ads.editAd);   // Edit ads
app.get('/comments', getComments);
app.post('/addComment', addComment);
app.post('/acceptBid', acceptBid);


app.listen(process.env.PORT || 3000);
console.log('Listening on port 3000');
