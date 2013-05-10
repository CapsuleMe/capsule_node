/**
 * New node file
 */
var creator = require('./creator'),
	Friends = require('./friends'),
	Profile = require('./profile');

function User(param){
	var opt = {
	 	number:null,
	 	name:null,
	 	password:null,
	 	role:null,
	 	male:'n',
	 	head:null,
	 	location:null,
	 	friends:new Friends(),
	 	profile:new Profile()
	 };

	creator.obj.safeCopy(opt,param);

	this._id = param._id;
	this.number = opt.number;
	this.name = opt.name;
	this.password = opt.password;
	this.role = opt.role;
	this.male = opt.male;
	this.head = opt.head;
	this.location = opt.location;
	this.friends = opt.friends;
	this.profile = opt.profile;
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

