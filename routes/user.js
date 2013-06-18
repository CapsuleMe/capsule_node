
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
	res.json(Val.error(1,err));
}

exports.reg = function(req, res){
	var number = req.body.number;
	var password = req.body.password;
	
	console.log(number);
	console.log(password);
	
	var user = new User({
		number:number,
		password:cryptoPassword(password)
	});
	
	user.save(function(err,user){
		if(err){
			return res.json(Val.error(1,err));
		}
		
		if(!user){
			return res.json(Val.error(2,'No User'));	
		}
		
		req.session.user = user;
		res.json(Val.success(user));
	});
};

exports.login = function(req, res){
	var id = req.body.id;
		pwd = req.body.pwd;
	User.get(id,function(err,user){
		if(err){
			return res.json(Val.error(1,err));
		}
		
		if(!user){
			return res.json(Val.success(1)); // no user	
		}
			
		if(user.password != pwd){
			return res.json(Val.success(2)); // wrong password
		}
		
		req.session.user = user;
		res.json(Val.success(0));	
	});
};

exports.logout = function(req, res){
	req.session.user = null;
	res.json(Val.success(0));	
};

exports.remove = function(req,res){
	var id = req.body.id;
	User.remove(id,function(err,numberOfRemovedDocs){
		if(err){
			return res.json(Val.error(1,err));
		}
		
		res.json(Val.success(numberOfRemovedDocs));	
	});
};

exports.update = function(req,res){
	
};

exports.get = function(req,res){
	var id = req.body.id;
	console.log(id);
	User.get(id,function(err,user){
		if(err){
			return res.json(Val.error(1,err));
		}
		
		if(!user){
			return res.json(Val.error(2,'No User'));	
		}
		
		res.json(Val.success(user));	
	});
};




