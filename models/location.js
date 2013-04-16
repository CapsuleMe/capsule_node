/**
 * New node file
 */
 
 var creator = require('./creator');
 var opt = {
 	user:null,
 	la:null,
 	lo:null,
 	ac:null,
 	time:null
 };
 	
 function Location(param){
 	creator.obj.safeCopy(opt,param);
 
 	this._id = param._id;
 	this.user = opt.user;
 	this.la = opt.la;
 	this.lo = opt.lo;
 	this.ac = opt.ac;
 	this.time = opt.time;
 }
 
 
creator.createModel(Location,'location');

module.exports = Location;
