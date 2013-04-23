/**
 * New node file
 */
exports.remove = function(array,val){
	var begin = array.length-1;
	var end = -1;
	for(var i = begin; i > end;i--){
		if(array[i] == val){
			array.splice(i,1);
			return i;
		}
	}
	
	return -1;
}

exports.contain = function(array,val){
	var begin = 0;
	var end = array.length;
	for(var i = begin; i < end;i++){
		if(array[i] == val){
			return i;
		}
	}
	
	return -1;
}