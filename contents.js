var fs = require('fs');
var content = {};
content.url = require('url');
content.msgFileName = 'data/messages.json';
content.messages = fs.existsSync(content.msgFileName) && JSON.parse(fs.readFileSync(content.msgFileName,"utf-8")) || [];
content.detailsFileName = 'data/details.json';
content.details = fs.existsSync(content.detailsFileName) && JSON.parse(fs.readFileSync(content.detailsFileName,"utf-8")) || {};
content.chatPage = fs.readFileSync('./view/chat.html',"utf-8");
content.bg_jpg = fs.readFileSync('./public/images/bg.jpg');
content.login = fs.readFileSync('./public/images/login.jpg');
content.signup = fs.readFileSync('./public/images/signup.jpg');
content.homepage = fs.readFileSync('./public/home.html');
content.fav_ico = fs.readFileSync('./public/images/favicon.ico');
content.loginPage = fs.readFileSync('./public/login.html','utf-8');
content.signUpPage = fs.readFileSync('./public/signup.html','utf-8');

exports.content = content;