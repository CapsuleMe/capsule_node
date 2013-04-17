/**
 * New node file
 */
var creator = require('./creator');

function User(param){
	var opt = {
	 	number:null,
	 	name:null,
	 	password:null
 	};

	creator.obj.safeCopy(opt,param);

	this._id = param._id;
	this.number = opt.number||'';
	this.name = opt.name||'';
	this.password = opt.password||'';
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