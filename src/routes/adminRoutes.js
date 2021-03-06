var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

//before you forget everything, connection -> collection -> do something
//sudo service mongod start/stop status
//can look at the db with 'mongo <name>'
//to delete all objects, do a db.collection.remove({})

var books = [
	{
			title: 'War and Peace',
			genre: 'Historical Fiction',
			author: 'Lev Nikolayevich Tolstoy',
			bookId: 656,
			read: false
			},
	{
			title: 'Les Misérables',
			genre: 'Historical Fiction',
			author: 'Victor Hugo',
			bookId: 24280,
			read: false
			},
	{
			title: 'The Time Machine',
			genre: 'Science Fiction',
			author: 'H. G. Wells',
			bookId: 2493,
			read: false
			}
];

var router = function(nav){

	adminRouter.route('/addBooks')
		.get(function(req, res){
			//mongo code goes here	
			var url = 'mongodb://localhost:27017/libraryApp';

			mongodb.connect(url, function(err, db){
				//like a table
				var collection = db.collection('books');	
				collection.insertMany(books, function(err, results){
					res.send(results);	
					db.close();
				});

			});

		});


	return adminRouter;
};

module.exports = router;
