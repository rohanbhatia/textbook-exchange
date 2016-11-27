var Ad = require('../models/ad');
var User = require('../models/user');


// app.get('/ads', ads.getAds);  
// Get all the post objects - also get individual post via fname
// gets ALL ads
exports.getAds = function(req, res) {

	console.log("getAds");

	//find ad by email
	if (req.query.email) {

		Ad.find({owner_email: req.query.email}, function(err, ads) {

			if (err) throw err;

			var fin = JSON.stringify("{ Ads: " + ads + " }");
			res.send(JSON.parse(fin));
		});

	}
	//find ads by course
	else if (req.query.course_code) {

		Ad.find({course_code: req.query.course_code}, function(err, ads) {

			if (err) throw err;

			var fin = JSON.stringify("{ Ads: " + ads + " }");
			res.send(JSON.parse(fin));
		});

	}
	//find ads by ad_id
	else if (req.query.ad_id) {

		Ad.find({ad_id: req.query.ad_id}, function(err, ads) {

			if (err) throw err;

			var fin = JSON.stringify("{ Ads: " + ads + " }");
			res.send(JSON.parse(fin));
		});

	}
	//find ads by title
	else if (req.query.book_title) {

		Ad.find({book_title: req.query.book_title}, function(err, ads) {

			if (err) throw err;

			var fin = JSON.stringify("{ Ads: " + ads + " }");
			res.send(JSON.parse(fin));
		});

	}
	//find all ads
	else {

		Ad.find({}, function(err, ads) {

			if (err) throw err;

			var fin = JSON.stringify("{ Ads: " + ads + " }");
			res.send(JSON.parse(fin));
		});	
	}
};

// app.post('/bid', ads.postBid);        
// Post A Bid
exports.postBid = function(req, res) {

};

// app.delete('/deleteAd', ads.deleteAd); 
// Delete
exports.deleteAd = function(req, res) {

	console.log("deleteAd");

};

// app.post('/newAd', ads.createNewAd);     
// Create New Ad
exports.createNewAd = function(req, res) {

	console.log("createNewAd");

	Ad.find({}, function(err, ads) {

		if (err) throw err;

		//add to ad database
		var newAd = Ad({

			ad_id: ads.length,
			title: req.body["book_title"],
			author: req.body["author"],
			description: req.body["description"],
			bid: req.body["bid"],
			isbn: req.body["isbn"],
			course_code: req.body["course_code"],
			owner_email: req.body["email"]
		});

		newAd.save(function(err) {

			if (err) throw err;
		});

		//add to user database
		var user_email = req.body["email"];
		User.find({email: user_email}, function(err, user) {
		
			if (err) throw err;
			
			//user found
			if (user[0]) {

				(user[0].selling_ad_ids).push(ads.length);

				user[0].save(function(err)	{
		
					if (err) throw err;
				});
			}
		});
	});

	res.send("Success\n");
};

// app.post('/editAd', ads.editAd);   
// Edit ad
exports.editAd = function(req, res) {

};