
/*
 * GET users listing.
 */
var crypto = require('crypto'), 
	User = require('../models/user'),
	Val = require('./value');


function cryptoPassword(password){
	var md5 = crypto.createHash('md5');
	return md5.update(password).digest('base64');
}

function sendError(res, err){
	res.send(Val.error(1,err));
}

exports.reg = function(req, res){
	var user = new User({
		number:req.body.number,
		password:cryptoPassword(req.body.password)
	});
	
	user.save(function(err,user){
		if(err){
			return res.send(Val.error(1,err));
		}
		
		if(!user){
			return res.send(Val.error(2,'No User'));	
		}
		
		req.session.user = user;
		res.send(Val.success(user));	
	});
};

exports.login = function(req, res){
	var id = req.body.id,
		pwd = req.body.pwd;
	User.get(id,function(err,user){
		if(err){
			return res.send(Val.error(1,err));
		}
		
		if(!user){
			return res.send(Val.error(2,'No User'));	
		}
			
		if(user.password != pwd){
			return res.send(Val.error(2,'Wrong PWD'));	
		}
		
		req.session.user = user;
		res.send(Val.success(0));	
	});
};

exports.logout = function(req, res){
	req.session.user = null;
	res.send(Val.success(0));	
};

exports.remove = function(req,res){
	var id = req.body.id;
	User.remove(id,function(err,numberOfRemovedDocs){
		if(err){
			return res.send(Val.error(1,err));
		}
		
		res.send(Val.success(numberOfRemovedDocs));	
	});
};

exports.update = function(req,res){
	
};

exports.get = function(req,res){
	var id = req.body.id;
	User.get(id,function(err,user){
		if(err){
			return res.send(Val.error(1,err));
		}
		
		if(!user){
			return res.send(Val.error(2,'No User'));	
		}
		
		res.send(Val.success(user));	
	});
};




