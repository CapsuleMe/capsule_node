
var user = require('./user');
var loc = require('./location');
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
	
	app.get('/loc/rec', auth, loc.rec);
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
