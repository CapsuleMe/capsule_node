
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

};

exports.login = function(req, res){

};

exports.logout = function(req, res){

};

exports.remove = function(req,res){

};

exports.update = function(req,res){

};

exports.get = function(req,res){

};




