
var user = require('./user'),
	loc = require('./location'),
 	msg = require('./message'),
 	friends = require('./friends'); 



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
	console.log('Runing in [Nomral] mode!')
	
	app.get('/', home);
	app.post('/users/reg', user.reg);
	app.post('/users/login', user.login);
	app.post('/users/logout', auth, user.logout);
	
	app.post('/users/get', auth, user.get);
	app.post('/users/update', auth, user.update);
	app.post('/users/remove', auth, user.remove);
	
	//Friends
	app.post('/friend/list',auth, friends.list);
	app.post('/friend/near',auth, friends.near);
	app.post('/friend/normal',auth, friends.normal);
	app.post('/friend/confirm',auth, friends.confirm);
	app.post('/friend/remove',auth, friends.remove);
	
	//Location
	app.post('/loc/rec', auth, loc.rec);
	
	//Message
	app.post('/msg/sys', auth, msg.sysmsg);
	app.post('/msg/user', auth, msg.usermsg);
	app.post('/msg/friend', auth, msg.friendmsg);
}

function debug(app){
	console.log('Runing in [Debug] mode!')
	
	app.get('/', home);
	app.get('/users/reg', user.reg);
	app.get('/users/login', user.login);
	app.get('/users/logout', auth, user.logout);
	
	app.get('/users/get', auth, user.get);
	app.get('/users/update', auth, user.update);
	app.get('/users/remove', auth, user.remove);

	//Friends
	
	app.get('/friend/list',auth, friends.list);
	app.get('/friend/near',auth, friends.near);
	app.get('/friend/normal',auth, friends.normal);
	app.get('/friend/confirm',auth, friends.confirm);
	app.get('/friend/remove',auth, friends.remove);
	
	//Location
	app.get('/loc/rec', auth, loc.rec);

	//Message
	app.get('/msg/sys', auth, msg.sysmsg);
	app.get('/msg/user', auth, msg.usermsg);
	app.get('/msg/friend', auth, msg.friendmsg);
}

function test(app){
	console.log('Runing in [Test] mode!')
	
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
