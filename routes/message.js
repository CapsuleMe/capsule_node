/**
 * New node file
 */
var SysMsg = require('../models/sys_msg'),
	UserMsg = require('../models/user_msg'),
	FriendMsg = require('../models/friend_msg'),
	Val = require('./value');
 
exports.sysmsg = function(req,res){	
	SysMsg.getAll(function(err,objs){
		if(err){
			res.json(Val.error(1,err));
			return;
		}
		
		var ret = [];
		for(var i = 0; i < objs.length; i += 1){
			if(!objs[i].isExpire()){
				ret.push(objs[i]);
			}
		}
		res.json(Val.success(ret));
	});
};

exports.usermsg = function(req,res){	
	var ret = [];	
	var id = req.body.id;

	UserMsg.gets({user:id},function(err,objs){
		if(err){
			res.json(Val.error(1,err));
			return 0;
		}
		ret.concat(objs);
		res.json(Val.success(ret));
	});
};


exports.friendmsg = function(req,res){	
	var ret = [];	
	var id = req.body.id;

	FriendMsg.gets({to:id},function(err,objs){
		if(err){
			res.json(Val.error(1,err));
			return 0;
		}
		ret.concat(objs);
		res.json(Val.success(ret));
	});
};