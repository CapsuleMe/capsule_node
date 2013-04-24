/**
 * New node file
 */
function Value(val,code,msg){
	var _val = val || null;
	var _code = code || null;
	var _msg = msg || null;
	

	this.value = _val;
	this.code = _code;
	this.msg = _msg;
}

exports.success = function(val,msg){
	return new Value(val,0,msg);
};

exports.error = function(code,msg){
	return new Value(null,code,msg);
}