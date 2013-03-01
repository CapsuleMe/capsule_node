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

exports.save = function(collName, object, callback){

	open(function(err,db){
		if(err){
			db.close();
			return callback(err);
		}
		
		db.collection(collName, function(err,collection){
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

exports.get = function(collName, search, callback){
	open(function(err,db){
		if(err){
			db.close();
			callback(err);
			return;
		}
		
		db.collection(collName, function(err,collection){
			if(err){
				db.close();
				callback(err);
				return;
			}
			
			collection.findOne(search,function(err,user){
				if(user){
					var user = new User(user);
					callback(err,user);
					return;
				}		
				callback(err,null);
			});
		});
	});	
};
	
};