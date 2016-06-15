var express = require('express');
var bodyParser = require('body-parser');

//instance of express
var app = express();

var port = process.env.PORT || 5000;
var nav = [{Link:'/Books', Text: 'Book'}, 
					 {Link: '/Authors', Text: 'Author'}];

//get the routers, and pass them to the app
var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

app.use(express.static('public'));
//no idea what's happening here
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


//where the templates are
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

app.get('/', function(req, res){
	//passing an object become available to jade in the template, cool
	res.render('index', {title: 'hello from ejs', 
											 nav: nav
											});

});

app.listen(port, function(err){
	console.log('running server on port ' + port);
});


