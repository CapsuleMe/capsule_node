
/**
 * Module dependencies.
 */

function startServer(app,port){
	http.createServer(app).listen(port, function(){
   		console.log("Express server listening on port " + app.get('port'));
	});
}

var app = require('express')()
  , http = require('http')
  , routes = require('./routes/index')
  , config = require('./config');

promise = require('./utils/promise');

config(app);

routes(app);

startServer(app,app.get('port'));

