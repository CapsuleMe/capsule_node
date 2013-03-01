/**
 * New node file
 */
var settings = require('../settings');
var Db = require('./db');

function Friend(friend){
	this.host = friend.host;
	this.guest = friend.guest;
	this.relation = friend.relation;
}

exports = module.exports = Friend;

