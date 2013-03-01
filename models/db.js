/**
 * New node file
 */
var settings = require('../settings');
var MongoClient = require('mongodb').MongoClient;

exports.open = function(callback){
	MongoClient.connect(settings.dbUrl,function(err,db){
		callback(err,db);
	});
};