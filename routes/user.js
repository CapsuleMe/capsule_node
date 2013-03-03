
/*
 * GET users listing.
 */
var crypto = require('crypto');
var User = require('../models/user');


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
	res.send({
		success:0,
		err:err,
		user: null
	});
}

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.reg = function(req, res){
	var newUser = getRequestUser(req);	

	User.get(newUser.number,function(err, user){
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