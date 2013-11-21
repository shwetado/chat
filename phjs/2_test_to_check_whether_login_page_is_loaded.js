var assert = require('./assert.js').main;
var page = require('webpage').create();

var _go_to_login = function(){
	document.getElementsByTagName('input')[1].click();
};

page.onLoadStarted = function (status) {
    console.log('Loading Started.');
};

var go = function (status) {
    console.log("loading..");
};

page.open('http://localhost:8282',go);

page.onLoadFinished = function (status) {
    console.log('Loading finished.');
    page.evaluate(_go_to_login);
    page.render('login.png');
    phantom.exit();
};
