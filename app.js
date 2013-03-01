
/**
 * Module dependencies.
 */

var express = require('express')
  , mongoStore = require('connect-mongo')(express)
  , settings = require('./settings')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

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
  	cookie: { path: '/', httpOnly: true, maxAge: 240*60*1000 },
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

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/users/reg', user.reg);
app.get('/users/login', user.login);
app.get('/users/logout', user.logout);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
