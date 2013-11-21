var content = require('./contents.js').content;
var fs = require('fs');
var contentType = {html:'text/html',jpg:'image/jpeg',ico:'image/x-icon'};
var handler = {};

handler['/template'] = function(req,res){

  var checkPassword = function(input){
    var details = content.querystring.parse(input);
    console.log(details);
    var userid = details.userid;
    var password = details.pswrd;
    res.writeHead(200, {'Content-Type': contentType.html});
    if( password == content.details[userid])
      res.write(content.chatPage.replace(/{MESSAGES}/,content.messages.join('\n')).replace(/{USERNAME}/,userid));
    else{
      res.write(content.loginPage); 
      res.write("<center><h2><font color = 'white'>Incorrect password or login name please try again!</h2></center></font>");
    }
    res.end();
  }
  req.setEncoding('utf8');
  req.on('data',checkPassword);
};

handler['/signUp'] = function(req,res){
  res.writeHead(200,{'Content-Type': contentType.html});
  res.write(content.signUpPage);
  res.end();  
};

handler['/delete'] = function(req,res){
  var deleteMsg = function(input){
    var userid = input.split('&')[0].split('=')[1];
    fs.writeFile(content.msgFileName,"[]");
    content.messages = [];
    res.write(content.chatPage.replace(/{MESSAGES}/,content.messages.join('\n')).replace(/{USERNAME}/,userid)); 
    res.end();
  }
  req.setEncoding('utf8');
  req.on('data',deleteMsg);
}

handler['/refresh'] = function(req,res){
   var refresh = function(input){
    var userid = input.split('&')[0].split('=')[1];
    res.write(content.chatPage.replace(/{MESSAGES}/,content.messages.join('\n')).replace(/{USERNAME}/,userid)); 
    res.end();
  }
  req.setEncoding('utf8');
  req.on('data',refresh);
}

handler['/chat'] = function(req,res){
  var tab = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  var display= function(input){
    var details = content.querystring.parse(input);
    var user = details.name;
    var msg = details.message;
    var date = new Date().toString().split('G')[0];
    var item = user + " ( " + date + " ) " + " : " + tab + msg;
    user && msg && content.messages.push(item) && fs.writeFile(content.msgFileName,JSON.stringify(content.messages));
    res.writeHead(200, {'Content-Type': contentType.html});
    res.write(content.chatPage.replace(/{MESSAGES}/,content.messages.join('\n')).replace(/{USERNAME}/,user));
    res.end();
  }
  req.setEncoding('utf8');
  req.on('data',display);
}

handler['/bg.jpg'] = function(req,res){
	res.writeHead(200,{'Content-Type': contentType.jpg});
  res.write(content.bg_jpg); 
	res.end();	
};

handler['/home.jpg'] = function(req,res){
  res.writeHead(200,{'Content-Type': contentType.jpg});
  res.write(content.home); 
  res.end();  
};

handler['/login.jpg'] = function(req,res){
  res.writeHead(200,{'Content-Type': contentType.jpg});
  res.write(content.login); 
  res.end();  
};

handler['/signup.jpg'] = function(req,res){
  res.writeHead(200,{'Content-Type': contentType.jpg});
  res.write(content.signup); 
  res.end();  
};

handler['/favicon.ico'] = function(req,res){
	res.writeHead(200,{'Content-Type': contentType.ico});
  res.write(content.fav_ico); 
	res.end();	
};

handler['/login'] = function(req,res){
  var req_url = content.url.parse(req.url,true);
  res.writeHead(200,{'Content-Type': contentType.html});
  res.write(content.loginPage); 
  res.end();  
};

handler['/'] = function(req,res){
  res.writeHead(200,{'Content-Type': contentType.html});
  res.write(content.homepage);
  res.end();  
};

handler['/index'] = function(req,res){
  var getDetails = function(input){
  var details = content.querystring.parse(input);
  console.log(details)
  var userid = details.name;
  var password = details.pass;
  var confirmPass = details.repass;
  var expr = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
  if(password.match(expr)==null){
    res.writeHead(200,{'Content-Type': contentType.html});
    res.write(content.signUpPage);
    res.write("<center><h2><font color = 'white'>Passwords must contain at least 1 upper case letter,<br>1 lower case letter,<br>1 number or special character,<br>at least 8 characters in length<font><h2/></center>");
    res.end();
  }
  else if( content.details[userid] ){
    res.writeHead(200,{'Content-Type': contentType.html});
    res.write(content.signUpPage);
    res.write("<center><h2><font color = 'white'> Username already exists!!<font><h2/></center>");
    res.end();
  }
  else if(password != confirmPass ){
    res.writeHead(200,{'Content-Type': contentType.html});
    res.write(content.signUpPage);
    res.write("<center><h2><font color = 'white'> Passwords do not match!!<font><h2/></center>");
  }
  else {
    content.details[userid] = password;
    fs.writeFile(content.detailsFileName,JSON.stringify(content.details));
    res.writeHead(200,{'Content-Type': contentType.html});
    res.write(content.homepage);    
    res.write("<center><h2><font color = 'white'> Account created successfully!<font><h2/></center>");
  }
  res.end();
  }
  req.setEncoding('utf8');
  req.on('data',getDetails);
}

exports.routes = handler;