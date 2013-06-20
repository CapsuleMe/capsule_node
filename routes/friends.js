var User = require('../models/user'),
	FMsg = require('../models/friend_msg'),
	UMsg = require('../models/user_msg'),
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
 		res.json(Val.success(0,'Success'));
 	});
 };
 
 exports.cancel = function(req,res){
 	FMsg.remove(req.body.id,function(err,number){
 		if(err){
 				sendError(res,err);
 				return;
 		}
 		
 		return res.json(Val.success(number,'Success'));
 	});
 };
 
 exports.remove = function(req,res){
	 var id = req.body.id;
	 
	 //Get Friend's User
	 User.get(id,function(err,user){
		if(err){
			sendError(res,err);
		}
		
		//Remove from Current
		req.session.user.friends.rm(id);
		req.session.user.save(function(err,user){
			if(err){
				sendError(res,err);
				return;
			}
			
			//Remove from Freind
			user.friends.rm(req.session.user.id);
			user.save(function(err,user){
				if(err){
					sendError(res,err);
					return;
				}
				
				//Create User Message to Friend
				var umsg = new UMsg({
					user:id,
				 	msg:req.session.user.name+"已将你从好友列表中删除。"
				});
				
				umsg.save(function(err,msg){
					if(err){
						sendError(res,err);
						return;
					}
					
					res.json(Val.success(0));
				});
			});
					
		});
	 });	 
 }

