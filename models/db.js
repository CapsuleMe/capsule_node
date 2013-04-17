/**
 * New node file
 */
var settings = require('../settings');
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var BSON = mongo.BSONPure;

//callback: function(err,db){}
function open(callback){
	MongoClient.connect(settings.dbUrl,function(err,db){
		callback(err,db);
	});
};

///parmas
//		.error function(err,db)
//		.success function(collection,db)
//		.collection 'users'
function openCollection(params){
	open(function(err,db){
		if(err){
			return params.error(err,db);
		}
		
		db.collection(params.collection,function(err,collection){
			if(err){
				return params.error(err,db);
			}
			
			params.success(collection,db);
		});
	});
}

function id(_id){
	return new BSON.ObjectID(_id);
};

function runCallback(callback,err,obj){
	if(callback){
		callback(err,obj);
	}
}

exports.open = open;
exports.openCollection = openCollection;
exports.id = id;

//save: {}
//   .collection:'users'
//   .object:user
//callback: function(err,object){}
exports.save = function(save, callback){
	openCollection({
		collection: save.collection,
		error:function(err,db){
			db.close();
			runCallback(callback,err);
		},
		success:function(collection,db){
			collection.insert(save.object,{safe: true},function(err,object){
				db.close();
				runCallback(callback,err,object);
			});
		}
	});
};

//search: {}
//     .collection:'users'
//     .contruct: function User(mongoObject){...}
//callback: function(err,object){}
exports.getAll = function(search,callback){
	openCollection({
		collection: search.collection,
		error: function(err,db){
			db.close();
			runCallback(callback,err);
		},
		success:function(collection,db){
			collection.find().toArray(function(err,objs){			
				if(objs){
					var ret = [];
					for(var i = 0; i < objs.length; i += 1){
						ret.push(new search.construct(objs[i]));
					}
					runCallback(callback,err,ret);
					return;
				}		
				runCallback(callback,err,null);
			});
		}
	});
};

//search: {}
//     .collection:'users'
//     .condition: '{number:1}'
//     .contruct: function User(mongoObject){...}
//callback: function(err,object){}
exports.get = function(search, callback){
	openCollection({
		collection: search.collection,
		error: function(err,db){
			db.close();
			runCallback(callback,err);
		},
		success:function(collection,db){
			collection.findOne(search.condition,function(err,obj){
				if(obj){
					var ret = new search.construct(obj);
					runCallback(callback,err,ret);
					return;
				}		
				runCallback(callback,err,null);
			});
		}
	});
};

//callback: function(err,object){}
exports.update = function(update,callback){
	openCollection({
		collection: update.collection,
		error: function(err,db){
			db.close();
			runCallback(callback,err);
		},
		success:function(collection,db){
			collection.update(update.query,update.object,function(err,numberOfUpdatededDocs){
				runCallback(callback,err,numberOfUpdatededDocs);
			});
		}
	});
}

//remove
//	  .collection: 'user'
//	  .query: {a:1}
//callback: function(err,numberOfRemovedDocs){}
exports.remove = function(remove,callback){
	openCollection({
		collection: remove.collection,
		error: function(err,db){
			db.close();
			runCallback(callback,err);
		},
		success: function(collection,db){
			collection.remove(remove.query,function(err,numberOfRemovedDocs){
				runCallback(callback,err,numberOfRemovedDocs);
			});
		}
	});
};
