var Ad = require('../models/ad');
var User = require('../models/user');


// app.get('/ads', ads.getAds);  
// Get all the post objects - also get individual post via fname
exports.getAds = function(req, res) {

};

// app.post('/bid', ads.postBid);        
// Post A Bid
exports.postBid = function(req, res) {

};

// app.delete('/deleteAd', ads.deleteAd); 
// Delete
exports.deleteAd = function(req, res) {

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
			title: req.body["title"],
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