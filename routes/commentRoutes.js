var Ad = require('../models/ad');
var User = require('../models/user');
var Comment = require('../models/comment');


// app.post('/newComment', comments.addComment);
// post a new comments
exports.addComment = function(req, res) {

	console.log("addComment");

	//generate comment_id
	var generated_id;

	Comment.find({}, function(err, comments) {

		if (err) throw err;

		generated_id = (new Date).getTime();

		//add comment to Comment Database
		var newComment = Comment({
			comment_id: generated_id,
			ad_id: req.body["ad_id"],
			poster_email: req.body["email"],
			comment: req.body["comment"]
		});

		newComment.save(function(err) {

			if (err) throw err;
		});

		//add comment to Ad database. NEED TO TEST
		Ad.find({ad_id: req.body["ad_id"]}, function(err, ads) {

			if (err) throw err;

			//ad found
			if (ads[0]) {

				(ads[0].comment_ids).push(generated_id);

				ads[0].save(function(err) {

					if (err) throw err;
				});

			}
		});

		//add comment to User database
		var user_email = req.body["email"];
		User.find({email: user_email}, function(err, user) {

			if (err) throw err;

			//user found
			if (user[0]) {

				(user[0].comment_ids).push(generated_id);

				user[0].save(function(err)	{

					if (err) throw err;
				});
			}
		});
	});

	res.send("Success\n");
};

// app.get('/getAdComments', comments.getAdComments);
// get all comment ids for 1 ad
exports.getAdComments = function(req, res) {

	console.log("getAdComments");

	try {

		Ad.find({ad_id: req.query.ad_id}, function(err, ad) {

			if (err) throw err;

			//ad found
			if(ad[0]) {
				res.send(ad[0].comment_ids);
			}
			else {
				res.send("Failure\n");
			}
		});
	}
	//likely invalid ad ID
	catch(err) {

		res.send("Failure\n");
	}
};

// app.get('/getComment', comments.getComment);
// get all info for 1 comment
exports.getComment = function(req, res) {

	console.log("getComment");
	try {

		Comment.find({comment_id: req.query.comment_id}, function(err, comment) {

			if (err) throw err;

			//comment found
			if(comment[0]) {
				res.send(comment[0]);
			}
			else {
				res.send("Failure\n");
			}
		});
	}
	catch(err) {

		res.send("Failure\n");
	}
};
