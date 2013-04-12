exports.sessionUser = function(req){
	var session = req.session;
	
	if( session != undefined && 
		session != null	&&
		session.user !=undefined &&
		session.user !=null){
		
		return session.user;
	}
	
	return null;
}
