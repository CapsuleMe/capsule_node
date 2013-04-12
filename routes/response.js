exports.success = function(val,msg){
	return {
		value:val,
		code:0,
		message:msg
	};
}

exports.failed = function (err_code,msg){
	return {
		value:undefined,
		code:err_code,
		message:msg
	};
}