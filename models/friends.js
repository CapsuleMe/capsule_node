var obj = require('./object'),
  	array = require('./array');

function Friends(param){
	var opt = {
		near:null,
		normal
	};
	
	obj.safeCopy(opt,param);
	
	this.near = opt.near||'';
	this.normal = opt.normal||'';

}

Friends.prototype.near = function(id){
	if(array.contain(this.near,id)>=0){
		return;
	}
	this.near.push(id);
	array.remove(this.normal,id);	
}

Friends.prototype.normal = function(id){
	if(array.contain(this.normal,id)>=0){
		return;
	}
	
	this.normal.push(id);
	array.remove(this.near,id);
}

Friends.prototype.rm = function(id){
	array.remove(this.normal,id);
	array.remove(this.near,id);	
}

module.exports = Friends;