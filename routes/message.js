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
			res.send(Val.error(1,err));
			return;
		}
		
		var ret = [];
		for(var i = 0; i < objs.length; i += 1){
			if(!objs[i].isExpire()){
				ret.push(objs[i]);
			}
		}
		res.send(Val.success(ret));
	});
};

exports.usermsg = function(req,res){	
	var ret = [];	
	var id = req.body.id;

	UserMsg.gets({user:id},function(err,objs){
		if(err){
			res.send(Val.error(1,err));
			return 0;
		}
			
		ret.concat(objs);
		console.log('1');
		
		FriendMsg.gets({to:id},function(err,objs){
			if(err){
				res.send(Val.error(1,err));
				return 0;
			}
			
			ret.concat(objs);
			console.log('2');
			
			res.send(Val.success(ret));
			console.log('3');
		});
		
	});
};