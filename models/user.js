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

User.getByNumber = function(number,callback){
	creator.db.get({
		collection: 'users',
		condition: {number:number},
		construct: User
	},callback);	
};