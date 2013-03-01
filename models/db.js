/**
 * New node file
 */
var settings = require('../settings');
var MongoClient = require('mongodb').MongoClient;

function open(callback){
	MongoClient.connect(settings.dbUrl,function(err,db){
		callback(err,db);
	});
};

exports.open = open;

exports.save = function(collection, object, callback){

	open(function(err,db){
		if(err){
			db.close();
			return callback(err);
		}
		
		db.collection(collection, function(err,collection){
			if(err){
				db.close();
				return callback(err);
			}
			
			//collection.ensureIndex('number',{unique: true});
			collection.insert(object,{safe: true},function(err,object){
				db.close();
				callback(err,object);
			});
		});
	});	
	
	
};