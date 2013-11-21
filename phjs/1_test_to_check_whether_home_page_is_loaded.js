var areEqual = require('./assert.js').areEqual;
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

var getButtonValues = function (status) {
	page.render('chatserver.png');	
	console.log(status)
	var result = page.evaluate(_get_Id);
	var expected = ["Sign up","Login"];
	console.log(areEqual(result,expected));
	phantom.exit();

};
page.open('http://localhost:8282',getButtonValues);