
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

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.reg = function(req, res){
	var ret = {
		success:1,
		err:'',
		user: null
	};
	var newUser = getRequestUser(req);	

	User.get(newUser.number,function(err, user){
		if(user){
			err='user already exist';
		}
		if(err){
			ret.success = 0;
			ret.err = err;	
			res.send(ret);
			return; 	
		}
		
		newUser.save(function(err,user){
			if(err){
				ret.success = 0;
				ret.err = err;	
				res.send(ret);
				return; 	
			}
			ret.user = user;
			res.send(ret);	
		});		
	});	
};

exports.login = function(req, res){

};

exports.logout = function(req, res){

};