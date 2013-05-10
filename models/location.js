/**
 * New node file
 */
 
 var creator = require('./creator'),
 	 ObjectID = require('mongodb').ObjectID, 
	 DBRef = require('mongodb').DBRef;
 	
 function Location(param){
 	 var opt = {
	 	user:null,
	 	la:null,
	 	lo:null,
	 	ac:null,
	 	time:null
 	};
 
 	creator.obj.safeCopy(opt,param);
 
 	this._id = param._id;
 	this.user = opt.user;
 	this.la = opt.la;
 	this.lo = opt.lo;
 	this.ac = opt.ac;
 	this.time = opt.time;
 }
 
Location.prototype.user = function(user){
	if(!user){
		return this.user;
	}
	
	if(typeof user == 'DBRef'){
		this.user = user;
	}
	else if(typeof user == 'ObjectID'){
		this.user = new DBRef('users',user);
	}
	else{
		this.user = new DBRef('users',ObjectID(user));
	}
}
 
creator.createModel(Location,'location');

module.exports = Location;
