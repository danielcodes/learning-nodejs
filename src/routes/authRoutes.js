var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

//function is here to do additional things
var router = function(){

	authRouter.route('/signUp')
		.post(function(req, res){
			console.log(req.body);

			//save to db
			var url = 'mongodb://localhost:27017/libraryApp';

			mongodb.connect(url, function(err, db){
				//create collection
				var collection = db.collection('users');

				var user = {
					username: req.body.userName,
					password: req.body.password
				};

				//collection created on insert
				//usually a select first to see if user exists
				collection.insert(user, function(err, results){
				
					//passport adds things to the request
					req.login(results.ops[0], function(){
						res.redirect('/auth/profile');	
					});


				});
			});
					
		});

	authRouter.route('/profile')
		.get(function(req, res){
			res.json(req.user);	
		});
	
	return authRouter;

};


module.exports = router;
