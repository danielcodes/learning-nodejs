var express = require('express');

//instance of express
var app = express();

var port = process.env.PORT || 5000;

app.use(express.static('public'));
app.set('views', './src/views');

app.set('view engine', 'ejs');

app.get('/', function(req, res){
	//passing an object become available to jade in the template, cool
	res.render('index', {title: 'hello from ejs', list: ['kenco', 'kenusa']});

});

app.get('/books', function(req, res){
	res.send('hello books');

});

app.listen(port, function(err){
	console.log('running server on port ' + port);

});
