
var creator = require('./creator');
 	
function User_Msg(param){
	var opt = {
		user:null,
	 	msg:null,
	 	time: new Date(),
	 	active:1
	}; 
 	creator.obj.safeCopy(opt,param);
 
 	var self = this;
 	self._id = param._id;
 	self.user = opt.user;
 	self.msg = opt.msg;
 	self.time = opt.time;
 	self.active = opt.active;
 }
 
 
creator.createModel(User_Msg,'usermsg');

module.exports = User_Msg;