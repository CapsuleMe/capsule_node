
/*
 * GET users listing.
 */
var crypto = require('crypto');
var User = require('../models/user');
var Val = require('./response');


function cryptoPassword(password){
	var md5 = crypto.createHash('md5');
	return md5.update(password).digest('base64');
}

function getRequestUser(req){
	return new User({
		number: req.query.u
	  , password: cryptoPassword(req.query.p)
	});
}

function sendError(res, err){
	res.send(Val.failed(1,err));
}

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.reg = function(req, res){
	var newUser = getRequestUser(req);	

	User.getByNumber(newUser.number,function(err, user){
		if(user){
			err='user already exist';
		}
		if(err){
			return sendError(res,err); 	
		}
		
		newUser.save(function(err,user){
			if(err){
				return sendError(res,err); 	
			}
			
			res.send({
				success:1,
				err:null,
				user:user
			});	
		});		
	});	
};

exports.login = function(req, res){

};

exports.logout = function(req, res){

};


exports.save = function(req, res){
	var newUser = getRequestUser(req);
	newUser.save(function(err,user){
			if(err){
				return sendError(res,err); 	
			}
			res.send(Val.success(user,'save success'));	
	});			
};

exports.get = function(req, res){
	User.get('513074e555164f7417000001',function(err,user){
		if(err){
				return sendError(res,err); 	
			}
			
		res.send(Val.success(user,'get success'));	
	});
};

exports.update = function(req, res){
	User.update('513074e555164f7417000001',{$set:{number:'18611447559'}},function(err,count){
		if(err){
				return sendError(res,err); 	
			}
			res.send({
				success:1,
				err:null,
				count:count
			});	
	});
};

exports.remove = function(req, res){
	User.remove('512f2998cb2e3a2c1c000001',function(err,count){
		if(err){
				return sendError(res,err); 	
			}
			res.send({
				success:1,
				err:null,
				count:count
			});	
	});

};


