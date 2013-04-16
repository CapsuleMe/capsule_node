/**
 * New node file
 */
var settings = require('../settings');
var Db = require('./db');
var Obj = require('./object');

exports.db = Db;
exports.obj = Obj;

exports.createModel = function(construct,collection){
	
	construct.collection = collection;
	construct.save = save;
	construct.get = get;
	construct.update = update;
	construct.remove = remove;
	
	construct.prototype.save = function(callback){
		construct.save(this,callback);
	}

};

function save(obj,callback){
	Db.save({
		collection: this.collection,
		object: obj
	},callback);
};

// callback - function(err,user)
function get(id,callback){
	Db.get({
		collection: this.collection,
		condition: {_id:Db.id(id)},
		construct: this
	},callback);	
};

function update(id,obj,callback){
	Db.update({
		collection: this.collection,
		query: {_id:Db.id(id)},
		object: obj
	},callback);
};

function remove(id,callback){
	Db.remove({
		collection: this.collection,
		query: {_id:Db.id(id)},
	},callback);
};