/**
 * New node file
 */
var settings = require('../settings');
var Db = require('./db');
var collectionName = 'users';

function User(user){	
	this.number = user.number||'';
	this.name = user.name||'';
	this.password = user.password||'';
};

module.exports = User;

//callback - function(err,user)
User.prototype.save = function(callback){	
	Db.save({
		collection: collectionName,
		object: {number: this.number, password: this.password}
	},callback);
};


// num - user phone number
// callback - function(err,user)
User.get = function(num,callback){
	Db.get({
		collection: collectionName,
		condition: {number:num},
		construct: User
	},callback);	
};

