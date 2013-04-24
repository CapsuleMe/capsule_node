
var user = require('./user');
var loc = require('./location');
var msg = require('./message'); 
var friends = require('./message'); 

exports = module.exports = function(app){
	app.get('/', home);
	app.get('/users', auth, user.list);
	app.get('/users/reg', user.reg);
	app.get('/users/login', user.login);
	app.get('/users/logout', auth, user.logout);
	
	app.get('/users/save', auth, user.save);
	app.get('/users/get', auth, user.get);
	app.get('/users/update', auth, user.update);
	app.get('/users/remove', auth, user.remove);
	
	//Friends
	app.post('/friend/list',auth, friends.list);
	app.post('/friend/near',auth, friends.near);
	app.post('/friend/normal',auth, friends.normal);
	app.post('/friend/confirm',auth, friends.confirm);
	app.post('/friend/remove',auth, friends.remove);
	
	//Location
	app.post('/loc/rec', auth, loc.rec);
	
	//Message
	app.post('/msg/sys', msg.sysmsg);
	
	
};


/*
 * GET home page.
 */
function home(req, res){
	res.render('index', { title: 'Express' });
};

function auth(req,res,next){
	if(req.session && req.session.user){
		next();
	}else{
		next(new Error('Unauthorized'));
	}
	
}
