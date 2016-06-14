var express = require('express');

//instance of express
var app = express();

var port = process.env.PORT || 5000;
var nav = [{Link:'/Books', Text: 'Book'}, 
					 {Link: '/Authors', Text: 'Author'}];
var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);

app.use(express.static('public'));
app.set('views', './src/views');

app.set('view engine', 'ejs');


app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);

app.get('/', function(req, res){
	//passing an object become available to jade in the template, cool
	res.render('index', {title: 'hello from ejs', 
											 nav: nav
											});

});

app.get('/books', function(req, res){
	res.send('hello books');

});

app.listen(port, function(err){
	console.log('running server on port ' + port);

});
