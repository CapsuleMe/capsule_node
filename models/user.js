/**
 * New node file
 */
var creator = require('./creator');

function User(user){
	this.number = user.number||'';
	this.name = user.name||'';
	this.password = user.password||'';
};

creator.createModel(User,'users');

module.exports = User;

//callback - function(err,user)
User.prototype.save = function(callback){
	User.save({number: this.number, password: this.password},callback);	
};

User.getByNumber = function(number,callback){
	Db.get({
		collection: collectionName,
		condition: {number:number},
		construct: User
	},callback);	
};