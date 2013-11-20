var page = require('webpage').create();
console.log('1',page,page.title,page.url);

var _read_Subjects = function(){
	var subjects = [];
	var h3s = document.getElementsByTagName('h3');
	for(var i=0;i<h3s.length;i++){
		subjects.push(h3s[i].innerHTML);
	}
	return subjects;
};

var getSubjectList = function(){
	console.log('2',page,page.title,page.url);
	var result = page.evaluate(_read_Subjects);
    console.log(result.length,result);	
    phantom.exit();
};

page.open('http://www.w3schools.com/',getSubjectList);