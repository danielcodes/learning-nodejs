var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

//functions to be used by the router
var bookController = function(bookService, nav){

	var middleware = function(req, res, next){
		if(!req.user){
			//res.redirect('/');	
		}
		next();
	};

	var getIndex = function(req, res){

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
		}); //closes mongo connect
	};
	
	var getById = function(req, res){

		var id = new objectId(req.params.id);
		var url = 'mongodb://localhost:27017/libraryApp';

		mongodb.connect(url, function(err, db){
			//create collection
			var collection = db.collection('books');

			//get all items
			collection.findOne({_id: id}, function(err, results){
				//this calls the service, which execuse the function
				console.log('the result is ', results);
				bookService.getBookById(results.bookId, function(err, book){

					//object with description
					results.book = book;
					res.render('bookView', 
										{title: 'hello from ejs', 
										 nav: nav,
										 book: results
									});
	
				});

			});
		}); //closes mongo connect
	};

	return {
		getIndex: getIndex,
		getById: getById,
		middleware: middleware
	};

};


module.exports = bookController;


