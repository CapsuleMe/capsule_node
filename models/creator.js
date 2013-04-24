/**
 * 这是一个创建Db类的工具，所有的Db工具都应当被这个类初始化。
 * 被这个类初始化的类，包含一下方法
 *
 * 函数上的方法（类似静态）
 * get(id,callbakc)
 * 	id = string tpye id value
 * 	callback = function(err,obj)
 * 
 * save(obj,callback)
 * 	obj = object with same type
 * 	callback = fucntion(err,obj)
 *
 * remove(id,callback)
 * 	id = string tpye id value
 * 	callback = function(err,numberOfRemovedDocs)
 *
 * update(id,obj,callback)
 * 	id = string tpye id value
 * 	obj = object with same type
 * 	callback = fucntion(err,obj)
 *
 *
 * 势力方法
 * save(callback)
 * 	callback = fucntion(err,obj)
 *
 * update(callback)
 * 	callback = fucntion(err,obj)
 *
 *
 *
 */
var settings = require('../settings');
var Db = require('./db');
var Obj = require('./object');

exports.db = Db;
exports.obj = Obj;

exports.createModel = function(construct,collection){
	
	construct.collection = collection;
	construct.save = save;
	construct.getAll = getAll;
	construct.get = get;
	construct.update = update;
	construct.remove = remove;
	
	construct.prototype.save = function(callback){
		construct.save(this,callback);
	}
	construct.prototype.update = function(callback){
		construct.update(this._id,this,callback);
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


function getAll(callback){
	Db.getAll({
		collection:this.collection,
		construct:this
	},callback);
}