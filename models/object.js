/**
 * New node file
 */
// Copy objB value to objA 
exports.safeCopy = function(objA, objB){
	if(!objB){
		return;
	}
	
	for(var p in objA){
		if(objB[p] || objB[p] == 0){
			objA[p] = objB[p];	
		}
	}
}

