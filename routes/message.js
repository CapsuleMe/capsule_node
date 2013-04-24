/**
 * New node file
 */
var SysMsg = require('../models/sys_msg'),
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