var express = require('express');
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var bookRouter = express.Router();

//a function that creates a router
//before router was being returned right away
var router = function(nav){

	//has to pull in the service
	var bookService = require('../services/goodreadsService.js')();
	var bookController = 
		require('../controllers/bookController')(bookService, nav);

	//securing all routes
	bookRouter.use(bookController.middleware);

	//all requests associated with /books
	bookRouter.route('/')
		.get(bookController.getIndex);

	bookRouter.route('/:id')
		.get(bookController.getById); //closes get

	return bookRouter;
};

module.exports = router;

