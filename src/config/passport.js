//keep passport code here
var passport = require('passport');

//different way, define function here
module.exports = function(app){

	app.use(passport.initialize());
	app.use(passport.session());

	//what data to store in the session
	passport.serializeUser(function(user, done){
		done(null, user);
	});

	//retrieve the user object through an id
	passport.deserializeUser(function(user, done){
		done(null, user);
	});

	//passport local stuff
	require('./strategies/local.strategy')();

};



