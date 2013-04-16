
var Location = require('../models/location');

function getLocation(req){
	return new Location({
		user: req.session.user._id,
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
			res.send({
				value:null,
				code:1,
				msg:err
			});
		}else{
			res.send({
				value:null,
				code:0,
				msg:null
			});
		}
	});
}

