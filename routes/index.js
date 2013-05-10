
var user = require('./user'),
	loc = require('./location'),
 	msg = require('./message'),
 	friends = require('./message'); 



exports = module.exports = function(app){
	if(settings.mode == 'debug'){
		return debug(app);
	}
	
	if(settings.mode == 'test'){
		return test(app);
	}
	
	run(app);
};


function run(app){
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
	app.post('/msg/user', msg.usermsg);
}

function debug(app){
	app.get('/', home);
	app.get('/msg/sys', msg.sysmsg);
	app.get('/msg/user', msg.usermsg);
}

function test(app){
	
}



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
