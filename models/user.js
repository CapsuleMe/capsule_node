/**
 * New node file
 */
var settings = require('../settings');
var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;

var Db = require('./db');

function User(user){	
	this.number = user.number||'';
	this.name = user.name||'';
	this.password = user.password||'';
};

module.exports = User;

//callback - function(err,user)
User.prototype.save = function(callback){
	var user = {
		number: this.number,
		password: this.password
	};
	
	Db.open(function(err,db){
		if(err){
			db.close();
			return callback(err);
		}
		
		db.collection('users', function(err,collection){
			if(err){
				db.close();
				return callback(err);
			}
			
			//collection.ensureIndex('number',{unique: true});
			collection.insert(user,{safe: true},function(err,user){
				db.close();
				callback(err,user);
			});
		});
	});	
};


// num - user phone number
// callback - function(err,user)
User.get = function(num,callback){
	Db.open(function(err,db){
		if(err){
			db.close();
			callback(err);
			return;
		}
		
		db.collection('users', function(err,collection){
			if(err){
				db.close();
				callback(err);
				return;
			}
			
			collection.findOne({number:num},function(err,user){
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

