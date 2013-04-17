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
 		var earlyDate = new Date().add({days:-self.expire});	
 		return self.time.isBefore(earlyDate);
 	};
 }
 
 
creator.createModel(Sys_Msg,'sysmsg');

module.exports = Sys_Msg;