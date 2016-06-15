var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

//function is here to do additional things
var router = function(){

	authRouter.route('/signUp')
		.post(function(req, res){
			//pull user and pw out of form
			//a nice json object
			console.log(req.body);
		
		});

	return authRouter;

};


module.exports = router;
