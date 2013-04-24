var creator = require('./creator');
 	
function Friend_Msg(param){
	var opt = {
	 	from:null, //should be id string type
	 	to:null,   //should be id string type
	 	type:0, // 0 normal, 1 near
	 	time:new Date(),
	 	active:1
	};

 	creator.obj.safeCopy(opt,param);
 
 	var self = this;
 	self._id = param._id;
 	self.from = opt.from;
 	self.to = opt.to;
 	self.type = opt.type;
 	self.time = opt.time;
 	self.active = opt.active;
 }
 
 
creator.createModel(Friend_Msg,'friendmsg');

module.exports = Friend_Msg;

