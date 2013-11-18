var url = require('url');
var fs = require('fs');
var msgFileName = 'data/messages.json';
var messages = fs.existsSync(msgFileName) && JSON.parse(fs.readFileSync(msgFileName,"utf-8")) || [];
var detailsFileName = 'data/details.json';
var details = fs.existsSync(detailsFileName) && JSON.parse(fs.readFileSync(detailsFileName,"utf-8")) || {};
var chatPage = fs.readFileSync('./view/chat.html',"utf-8");
var bg_jpg = fs.readFileSync('./public/images/bg.jpg');
var image = fs.readFileSync('./public/images/chat.jpg');
var homepage = fs.readFileSync('./public/home.html');
var fav_ico = fs.readFileSync('./public/images/favicon.ico');
var loginPage = fs.readFileSync('./public/login.html','utf-8');
var contentType = {html:'text/html',jpg:'image/jpeg',ico:'image/x-icon'};
var signUpPage = fs.readFileSync('./public/signup.html','utf-8');
 
var handler = {};
var crypto = require('crypto');

handler['/template'] = function(req,res){
  var checkPassword = function(input){
    var userid = input.split('&')[0].split('=')[1];
    var password = input.split('&')[1].split('=')[1];
    res.writeHead(200, {'Content-Type': contentType.html});
    if(password == details[userid])
      res.write(chatPage.replace(/{MESSAGES}/,messages.join('<br/>')).replace(/{USERNAME}/,userid));
    else{
      res.write(loginPage); 
      res.write("<h2><font color = 'white'> Incorrect password or login name please try again!<font><h2/>");
    }
    res.end();
  }
  req.setEncoding('utf8');
  req.on('data',checkPassword);
};

handler['/signUp'] = function(req,res){
  res.writeHead(200,{'Content-Type': contentType.html});
  res.write(signUpPage); 
  res.end();  
};

handler['/delete'] = function(req,res){
  var userid = url.parse(req.url,true).query.name;
  fs.writeFile(msgFileName,"[]");
  messages = [];
  res.write(chatPage.replace(/{MESSAGES}/,messages.join('<br/>')).replace(/{USERNAME}/,userid)); 
  res.end();
}

handler['/chat'] = function(req,res){
  var tab = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  var userid = url.parse(req.url,true).query.name;
  var query = url.parse(req.url,true).query; 
  var user = query.name ;
  var msg = query.message;
  var ip = (req.connection.remoteAddress);
  var date = new Date().toString().split('G')[0];
  var item = user + " [ " + ip + " ] " + " : " + tab + msg + tab + " ( " + date + " ) ";
  user && msg && messages.push(item) && fs.writeFile(msgFileName,JSON.stringify(messages));
  res.writeHead(200, {'Content-Type': contentType.html});
  res.write(chatPage.replace(/{MESSAGES}/,messages.join('<br/>')).replace(/{USERNAME}/,userid)); 
  res.end();
}

handler['/bg.jpg'] = function(req,res){
	res.writeHead(200,{'Content-Type': contentType.jpg});
  res.write(bg_jpg); 
	res.end();	
};

handler['/chat.jpg'] = function(req,res){
  res.writeHead(200,{'Content-Type': contentType.jpg});
  res.write(image); 
  res.end();  
};

handler['/favicon.ico'] = function(req,res){
	res.writeHead(200,{'Content-Type': contentType.ico});
  res.write(fav_ico); 
	res.end();	
};

handler['/login'] = function(req,res){
  var req_url = url.parse(req.url,true);
  res.writeHead(200,{'Content-Type': contentType.html});
  res.write(loginPage); 
  res.end();  
};


handler['/'] = function(req,res){
  res.writeHead(200,{'Content-Type': contentType.html});
  res.write(homepage);
  res.end();  
};

handler['/index'] = function(req,res){
  var getDetails = function(input){
  var userid = input.split('&')[0].split('=')[1];
  var password = input.split('&')[1].split('=')[1];
  var confirmPass = input.split('&')[2].split('=')[1];
  if(password != confirmPass || details[userid]){
    res.writeHead(200,{'Content-Type': contentType.html});
    res.write(signUpPage);
    res.write("<center><h2><font color = 'white'> Details are not matching!!<font><h2/></center>");
  }
  else{
    details[userid] = password;
    fs.writeFile(detailsFileName,JSON.stringify(details));
    res.writeHead(200,{'Content-Type': contentType.html});
    res.write(homepage);    
  }
  res.end();
  }
  req.setEncoding('utf8');
  req.on('data',getDetails);
}

exports.routes = handler;