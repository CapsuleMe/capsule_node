var obj = require('./object');

function Profile(param){
	var opt = {
		mail:null,
		weibo:null,
		qq:null,
		homepage:null,
		company:null,
		university:null,
		address:null,
		job:null
	};
	
	obj.safeCopy(opt,param);
	
	this.mail = opt.mail;
	this.weibo = opt.weibo;
	this.qq = opt.qq;
	this.homepage = opt.homepage;
	this.company = opt.company;
	this.university = opt.university;
	this.address = opt.address;
	this.job = opt.job;	
}

module.exports = Profile;
