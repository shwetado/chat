var assert = require('./assert.js').main;
var page = require('webpage').create();
var _get_Id = function(){
	var items = [];
	var form = document.getElementsByTagName('form');
	for(var i=0;i<=form.length;i++){
		var a = form[0].getElementsByTagName('input')[i].value;
		items.push(a);
	}
	return items;
};

var getButtonValues = function () {
	page.render('chatserver.png');	
	var result = page.evaluate(_get_Id);
	var expected = ["Sign up","Login"];
	console.log(assert(result,expected));
	phantom.exit();
};

var _go_to_login = function(){
	var items = [];
	var form = document.getElementsByTagName('form');
	for(var i=0;i<=form.length;i++){
		var a = form[0].getElementsByTagName('input')[i];
		eventFire(a,'click');
		items.push(a);
	}
	return items;
};

var goToLogin = function(){
	var result = page.evaluate(_go_to_login);
	page.render('login.png');
	phantom.exit();
};

page.open('http://localhost:8282',getButtonValues);
page.open('http://localhost:8282',goToLogin);