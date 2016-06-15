var express = require('express');
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var bookRouter = express.Router();

//a function that creates a router
//before router was being returned right away
var router = function(nav){

	//securing all routes
	bookRouter.use(function(req, res, next){
		if(!req.user){
			res.redirect('/');	
		}
		next();
	});

	//all requests associated with /books
	bookRouter.route('/')
		.get(function(req, res){

			//pull data from db
			var url = 'mongodb://localhost:27017/libraryApp';

			mongodb.connect(url, function(err, db){
				//create collection
				var collection = db.collection('books');

				//get all items
				collection.find({}).toArray(function(err, results){
					res.render('bookListView', 
									  	{title: 'hello from ejs', 
											 nav: nav,
											 books: results
										});
				});
			});
		});

	bookRouter.route('/:id')
		.get(function(req, res){

			var id = new objectId(req.params.id);
			var url = 'mongodb://localhost:27017/libraryApp';

			mongodb.connect(url, function(err, db){
				//create collection
				var collection = db.collection('books');

				//get all items
				collection.findOne({_id: id}, function(err, results){
					res.render('bookView', 
									  	{title: 'hello from ejs', 
											 nav: nav,
											 book: results
										});
				});
			});

		}); //closes get

	return bookRouter;
};

module.exports = router;

