var goodreadsService = function(){

	var getBookById = function(id, cb){
		cb(null, {description: "Some description, damn this is dense"});


	};

	return {
		getBookById: getBookById	
	};

};


module.exports = goodreadsService;
