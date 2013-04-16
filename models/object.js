/**
 * New node file
 */
// Copy objB value to objA 
exports.safeCopy = function(objA, objB){
	for(var p in objA){
		if(objB[p]){
			objA[p] = objB[p];	
		}
	}
}

