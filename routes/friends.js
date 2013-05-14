var User = require('../models/user'),
	FMsg = require('../models/friend_msg'),
	Val = require('./value');

function sendError(res,err){
	res.json(Val.error(1,err));
}

 exports.list = function(req,res){
 	var friends = req.session.user.friends;
 	return res.json(Val.success(friends));
 };
 
 exports.near = function(req,res){	
	User.get(req.body.id,function(err,user){
		if(err){
			sendError(res,err);
			return;
		}
		
		var fmsg = new FMsg({
			from: req.session.user._id,
	 		to:user._id,
	 		type: 1
		});
		
		fmsg.save(function(err,msg){
			if(err){
				sendError(res,err);
				return;
			}
			
			res.json(Val.success(msg));
		});
	});
	
 };
 
 exports.normal = function(req,res){
	User.get(req.body.id,function(err,user){
		if(err){
			sendError(res,err);
			return;
		}
		
		var fmsg = new FMsg({
			from: req.session.user._id,
	 		to:user._id,
	 		type: 0
		});
		
		fmsg.save(function(err,msg){
			if(err){
				sendError(res,err);
				return;
			}
			
			res.json(Val.success(msg));
		});
	});
 };
 
 exports.confirm = function(req,res){
 	//根据Id获取消息
 	FMsg.get(req.body.id,function(err,msg){
 		if(err){
 			sendError(res,err);
 			return;
 		}
 		
 		//Add to from user's friend list
 		User.get(msg.from,function(err,user){
 			if(err){
 				sendError(res,err);
 				return;
 			}
 			
 			user.friends.add(msg.to,msg.type);
 			user.save(function(err,user){
 				if(err){
 					sendError(res,err);
 					return;
 				}
 			});
 		});
 		
 		//add to to user's friend list
 		User.get(msg.to,function(err,user){
 			if(err){
 				sendError(res,err);
 				return;
 			}
 			
 			user.friends.add(msg.from,msg.type);
 			user.save(function(err,user){
 				if(err){
 					sendError(res,err);
 					return;
 				}
 			});
 		});
 		
 		//deactive message
 		msg.active = 0;
 		msg.update(function(err,msg){
 			if(err){
 				sendError(res,err);
 				return;
 			}
 		});
 		res.json(Val.success(null,'Success'));
 	});
 };
 
 exports.remove = function(req,res){
 	FMsg.remove(req.body.id,function(err,number){
 		if(err){
 				sendError(res,err);
 				return;
 		}
 		
 		return res.json(Val.success(number,'Success'));
 	});
 };
 

