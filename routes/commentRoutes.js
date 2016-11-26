var Ad = require('../models/ad');
var User = require('../models/user');
var Comment = require('../models/comment');


// app.post('/newComment', comments.addComment); 
// post a new comment

exports.addComment = function(req, res) {
	
	console.log("addComment");

	//generate comment_id
	var generated_id;

	Comment.find({}, function(err, comments) {

		if (err) throw err;

		generated_id = comments.length;

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
				
				console.log("ad comment_ids: " + ads[0].comment_ids);
				(ads[0].comment_ids).push(generated_id);
				console.log("ad comment_ids: " + ads[0].comment_ids);
			
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

