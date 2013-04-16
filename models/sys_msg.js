require('date-utils');

var creator = require('./creator');

var opt = {
 	msg,
 	time: new Date(),
 	expire
};
 	
function Sys_Msg(param){
 	creator.obj.safeCopy(opt,param);
 
 	var self = this;
 	self._id = param._id;
 	self.msg = opt.msg;
 	self.time = opt.time;
 	self.expire = opt.expire;
 	
 	self.isActive = function(){
 		return self.time.isAfter(new Date());
 	};
 	
 	self.isExpire = function(){
 		return self.time.add({days:self.expire}).isBefore(new Date());
 	};
 }
 
 
creator.createModel(Sys_Msg,'sysmsg');

module.exports = Sys_Msg;