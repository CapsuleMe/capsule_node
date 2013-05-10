function Promise(){	 
	 this.then = function(func){
	 	if(func()){
	 		return new Promise();
	 	}
	 	return new FakePromise();
	 };
}

function FakePromise(){
	this.then = function(){
		return new FakePromise();
	}
}

module.exports = new Promise();