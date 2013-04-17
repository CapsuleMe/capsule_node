require('date-utils');

var creator = require('./creator');
 	
function Sys_Msg(param){
	var opt = {
	 	msg:null,
	 	time: new Date(),
	 	expire:null
	}; 
 	creator.obj.safeCopy(opt,param);
 
 	var self = this;
 	self._id = param._id;
 	self.msg = opt.msg;
 	self.time = opt.time;
 	self.expire = opt.expire;
 		
 	self.isExpire = function(){
 		return self.time.add({days:self.expire}).isBefore(new Date());
 	};
 }
 
 
creator.createModel(Sys_Msg,'sysmsg');

module.exports = Sys_Msg;