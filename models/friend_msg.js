var creator = require('./creator');
 	
function Friend_Msg(param){
	var opt = {
	 	from:null,
	 	to:null,
	 	type:null,
	 	time:null
	};

 	creator.obj.safeCopy(opt,param);
 
 	var self = this;
 	self._id = param._id;
 	self.from = opt.from;
 	self.to = opt.to;
 	self.type = opt.type;
 	self.time = opt.time;
 }
 
 
creator.createModel(Friend_Msg,'friendmsg');

module.exports = Friend_Msg;

