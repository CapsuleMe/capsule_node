
var express = require('express')
  , mongoStore = require('connect-mongo')(express)
  , settings = require('./settings')
  , path = require('path');
  
 exports = module.exports = function(app){
	 app.configure(function(){
	  app.set('port', process.env.PORT || 3000);
	  app.set('views', __dirname + '/views');
	  app.set('view engine', 'jade');
	  app.use(express.favicon());
	  app.use(express.logger('dev'));
	  app.use(express.bodyParser());
	  app.use(express.methodOverride());
	  app.use(express.cookieParser(settings.cookieSecret));
	  app.use(express.session({
	  	secret: settings.cookieSecret,
	  	cookie: { path: '/', httpOnly: true, maxAge: 10*24*60*60*1000 },
	  	store: new mongoStore({
	  		url: settings.dbUrl
	  	})
	  }));
	  app.use(app.router);
	  app.use(express.static(path.join(__dirname, 'public')));
	});

	app.configure('development', function(){
	  app.use(express.errorHandler());
	});
};