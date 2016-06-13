var express = require('express');

var bookRouter = express.Router();

//a function that creates a router
//before router was being returned right away
var router = function(nav){

	var books = [
		{
				title: 'War and Peace',
				genre: 'Historical Fiction',
				author: 'Lev Nikolayevich Tolstoy',
				read: false
				},
		{
				title: 'Les Misérables',
				genre: 'Historical Fiction',
				author: 'Victor Hugo',
				read: false
				},
		{
				title: 'The Time Machine',
				genre: 'Science Fiction',
				author: 'H. G. Wells',
				read: false
				}
		];

	//all requests associated with /books
	bookRouter.route('/')
		.get(function(req, res){
			res.render('bookListView', {title: 'hello from ejs', 
													 nav: nav,
													 books: books
												});

		});

	bookRouter.route('/:id')
		.get(function(req, res){
			var id = req.params.id;
			res.render('bookView', {title: 'hello from ejs', 
													 nav: nav,
													 books: books[id]
												});

		});

	return bookRouter;
};

module.exports = router;

