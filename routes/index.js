
var user = require('./user');

exports = module.exports = function(app){
	app.get('/', home);
	app.get('/users', user.list);
	app.get('/users/reg', user.reg);
	app.get('/users/login', user.login);
	app.get('/users/logout', user.logout);
};


/*
 * GET home page.
 */
function home(req, res){
	res.render('index', { title: 'Express' });
};
