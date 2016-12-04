var Ad = require('../models/ad');
var User = require('../models/user');
var nodemailer = require('nodemailer');
var transporter2 = nodemailer.createTransport('smtps://donotreply_uoftextbook%40timothylock.ca:eDtU;Y;g4}NgBz$M@smtp.zoho.com');

// app.get('/ads', ads.getAds);
// Get all the post objects - also get individual post via fname
// gets ALL ads if no ad_id provided
exports.getAds = function(req, res) {

	console.log("getAds");

	//find ad by email
	if (req.query.email) {

		Ad.find({owner_email: req.query.email}, function(err, ads) {

			if (err) throw err;

			res.json({"ads": ads});
		});

	}
	//find ads by course
	else if (req.query.course_code) {

		Ad.find({course_code: req.query.course_code}, function(err, ads) {

			if (err) throw err;

			res.json({"ads": ads});
		});

	}
	//find ads by ad_id
	else if (req.query.ad_id) {

		Ad.find({ad_id: req.query.ad_id}, function(err, ads) {

			if (err) throw err;
			res.json({"ads": ads});
		});

	}
	//find ads by title
	else if (req.query.book_title) {

		Ad.find({book_title: req.query.book_title}, function(err, ads) {

			if (err) throw err;

			res.json({"ads": ads});
		});

	}
	//find all ads
	else {

		Ad.find({}, function(err, ads) {

			if (err) throw err;
			res.json({"ads": ads});
		});
	}
};

// app.post('/bid', ads.postBid);
// Post A Bid
exports.postBid = function(req, res) {

	console.log("postBid");

	Ad.find({ad_id: req.body["ad_id"]}, function(err, ads) {

		if (err) throw err;

		//only modify if new bid is higher
		if (ads[0].bid < req.body["bid"]) {

			ads[0].bid = req.body["bid"];
			ads[0].bid_owner = req.body["email"];
			ads[0].save(function(err) {

				if (err) throw err;

				res.send("Bid submitted!");
			});
		}
		else {
			res.send("Bid entered is too low!");
		}
	});
};


//app.post('/acceptBid', ads.acceptBid);
//Accept bid
exports.acceptBid = function (req, res) {

	var token = req.body.token;

	Ad.find({ad_id: req.body["ad_id"]}, function(err, ads) {

		if (err) throw err;

		if (ads[0]) {

			//get user
			var user = ads[0].owner_email;


			User.find({email: user}, function(err, user) {

				if (err) throw err;

				//user found
				if (user[0]) {
						var seller_email = user[0].email;
						var buyer_email = ads[0].bid_owner;
			    	//check validity of token
					if (token == user[0].session_token) {

						//send email
						try {
							// Send the acceptedBid email out
							var emailContent = "Hello ! \n\n" + user[0].first_name +
									" has accepted " + buyer_email + "'s bid of $" + ads[0].bid +
									" for the book '" + ads[0].book_title + "'. \n" +
									"Please contact each other via the emails provided to " +
									"complete the sale! \n\nThank you for using UofTextbook!" +
									"\n\nCheers,\nThe UofTextbook Team";

							var mailOptions = {
									from: '"UofTextbook" <donotreply_uoftextbook@timothylock.ca>', // sender address
									to: (seller_email + ", " + buyer_email), // list of receivers
									subject: ('UofTextbook - "' + ads[0].book_title + '" completed sale!'), // Subject line
									text: emailContent, // plaintext body
									html: ("<p>Hello!<br><br>" + user[0].first_name +
											" has accepted " + buyer_email + "'s bid of $" + ads[0].bid +
											" for the book '" + ads[0].book_title + "'. <br>" +
											"Please contact each other via the emails provided to " +
											"complete the sale! <br><br>Thank you for using UofTextbook!" +
											"<br><br>Cheers,<br>The UofTextbook Team"
									+ "</p>") // html body
							};


							// send mail with defined transport object
							transporter2.sendMail(mailOptions, function(error, info){
									if(error){
											return console.log(error);
									}
									console.log('Message sent: ' + info.response);
							});
						}
						catch (err) {
							console.log("Error Sending Email");
						}
						//remove the ad from the user's list of ads and then delete the ad
						var i = (user[0].selling_ad_ids).indexOf(req.query.ad_id);
						user[0].selling_ad_ids.splice(i, 1);
						user[0].save(function(err) {

							if (err) throw err;
							ads[0].remove(function(err) {

								if (err) throw err;
								res.send("Success");
							});
						});

					}
					//invalid token
					else {

						res.send("Failure\n");
					}
				}
				//user not found
				else {
					res.send("Failure: ad's owner does not exist\n");
				}
			});
		}
		else {
			res.send("Failure: invalid ad_id\n");
		}
	});
};

// app.delete('/deleteAd', ads.deleteAd);
// Delete
exports.deleteAd = function(req, res) {

	console.log("deleteAd");

	Ad.find({ad_id: req.query.ad_id}, function(err, ads) {

		if (err) throw err;

		//ad found
		if (ads[0]) {

			ads[0].remove(function(err) {

				if (err) throw err;

				User.find({email: ads[0].owner_email}, function(err, user) {
					if (err) throw err;

					// user found
					if (user[0]) {
						var i = (user[0].selling_ad_ids).indexOf(req.query.ad_id);
						user[0].selling_ad_ids.splice(i, 1);
						user[0].save(function(err) {

							if (err) throw err;

							res.send("Ad successfully deleted!");
						});
					}
					else {
						res.send("Unable to delete this ad at this time.");
					}
				});

			});
		}
		//ad not found
		else {
			res.send("Unable to delete this ad at this time.");
		}

	});
};

// app.post('/newAd', ads.createNewAd);
// Create New Ad
exports.createNewAd = function(req, res) {

	console.log("createNewAd");

	Ad.find({}, function(err, ads) {

		if (err) throw err;
		//add to ad database
		var newAdId = (new Date).getTime();
		var newAd = Ad({

			ad_id: newAdId,
			book_title: req.body["book_title"],
			author: req.body["author"],
			desc: req.body["desc"],
			bid: req.body["bid"],
			bid_owner: req.body["email"],
			isbn: req.body["isbn"],
			course_code: req.body["course_code"],
			owner_email: req.body["email"]
		});

		newAd.save(function(err) {

			if (err) throw err;
		});

		//add new ad to its owner's list of ads in the user database
		var user_email = req.body["email"];
		User.find({email: user_email}, function(err, user) {

			if (err) throw err;

			//user found
			if (user[0]) {
				(user[0].selling_ad_ids).push(newAdId);

				user[0].save(function(err)	{

					if (err) throw err;
				});
			}
		});

		res.send("Success");

	});
};

// app.post('/editAd', ads.editAd);
// Edit ad
exports.editAd = function(req, res) {

	console.log("editAd");

	// Check if user making the req has permissions to make changes
	User.find({session_token: req.body.token}, function(err, user) {

		if (err) throw err;

		if (user[0]) {
				if (user[0].selling_ad_ids.indexOf(req.body["ad_id"]) != -1
							|| user[0].admin_status) {
					Ad.find({ad_id: req.body["ad_id"]}, function(err, ads) {

						if (err) throw err;

						ads[0].book_title = req.body["book_title"];
						ads[0].author = req.body["author"];
						ads[0].desc = req.body["desc"];
						// Update bid only if it has changed, and update bid_owner as well
						if (ads[0].bid != Number(req.body.bid)) {
							ads[0].bid = Number(req.body["bid"]);
							ads[0].bid_owner = user[0].email;
						}
						ads[0].isbn = req.body["isbn"];
						ads[0].course_code = req.body["course_code"];

						ads[0].save(function(err)	{

							if (err) throw err;

							res.send("Success");
						});

					});
			}
			else {
				res.send("You do not have permission to edit this listing.");
			}
		}
		else {
			res.send("You do not have permission to edit this listing.");
		}
	});

};
