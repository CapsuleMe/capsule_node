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

//save
//   .collection:'users'
//   .object:user
exports.save = function(save, callback){

	open(function(err,db){
		if(err){
			db.close();
			return callback(err);
		}
		
		db.collection(save.collection, function(err,collection){
			if(err){
				db.close();
				return callback(err);
			}
			
			//collection.ensureIndex('number',{unique: true});
			collection.insert(save.object,{safe: true},function(err,object){
				db.close();
				callback(err,object);
			});
		});
	});	
};
//search
//     .collection:'users'
//     .condition: '{number:1}'
//     .contruct: function User(mongoObject){...}
exports.get = function(search, callback){
	open(function(err,db){
		if(err){
			db.close();
			callback(err);
			return;
		}
		
		db.collection(search.collection, function(err,collection){
			if(err){
				db.close();
				callback(err);
				return;
			}
			
			collection.findOne(search.condition,function(err,obj){
				if(obj){
					var ret = search.construct(obj);
					callback(err,obj);
					return;
				}		
				callback(err,null);
			});
		});
	});	
};