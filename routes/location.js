
var Location = require('../models/location'),
	ObjectID = require('mongodb').ObjectID, 
	DBRef = require('mongodb').DBRef,
	Val = require('./value');

function getLocation(req){
	var id = ObjectID(req.session.user._id);

	return new Location({
		user: new DBRef('users',id),
		la:	req.body.la,
		lo: req.body.lo,
		ac: req.body.ac,
		time: new Date()
	});
}

exports.rec = function(req, res){
	var loc = getLocation(req);
	loc.save(function(err){
		if(err){
			res.send(Val.error(1,err);
		}else{
			res.send(Val.success(null));
		}
	});
}

