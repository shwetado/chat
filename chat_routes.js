var content = require('./contents.js').content;
var fs = require('fs');
var contentType = {html:'text/html',jpg:'image/jpeg',ico:'image/x-icon'};
var handler = {};

handler['/template'] = function(req,res){
  var checkPassword = function(input){
    var userid = input.split('&')[0].split('=')[1];
    var password = input.split('&')[1].split('=')[1];
    res.writeHead(200, {'Content-Type': contentType.html});
    if( password == content.details[userid])
      res.write(content.chatPage.replace(/{MESSAGES}/,content.messages.join('<br/>')).replace(/{USERNAME}/,userid));
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
  var userid = content.url.parse(req.url,true).query.name;
  fs.writeFile(content.msgFileName,"[]");
  content.messages = [];
  res.write(content.chatPage.replace(/{MESSAGES}/,content.messages.join('<br/>')).replace(/{USERNAME}/,userid)); 
  res.end();
}

handler['/refresh'] = function(req,res){
  var userid = content.url.parse(req.url,true).query.name;
  res.write(content.chatPage.replace(/{MESSAGES}/,content.messages.join('<br/>')).replace(/{USERNAME}/,userid)); 
  res.end();
}

handler['/chat'] = function(req,res){
  var tab = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  var userid = content.url.parse(req.url,true).query.name;
  var query = content.url.parse(req.url,true).query; 
  var hidden = query.hidden;
  var user = query.name ;
  var msg = query.message;
  var ip = (req.connection.remoteAddress);
  var date = new Date().toString().split('G')[0];
  var item = user + " [ " + ip + " ] " + " : " + tab + msg + tab + " ( " + date + " ) ";
  user && msg && content.messages.push(item) && fs.writeFile(content.msgFileName,JSON.stringify(content.messages));
  res.writeHead(200, {'Content-Type': contentType.html});
  if(hidden)
    res.write(content.chatPage.replace(/{MESSAGES}/,content.messages.join('<br/>')).replace(/{USERNAME}/,userid));
  else
    res.write(content.loginPage);
  res.end();

}

handler['/bg.jpg'] = function(req,res){
	res.writeHead(200,{'Content-Type': contentType.jpg});
  res.write(content.bg_jpg); 
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
  var userid = input.split('&')[0].split('=')[1];
  var password = input.split('&')[1].split('=')[1];
  var confirmPass = input.split('&')[2].split('=')[1];
  if( content.details[userid] ){
    res.writeHead(200,{'Content-Type': contentType.html});
    res.write(content.signUpPage);
    res.write("<center><h2><font color = 'white'> Username already exists!!<font><h2/></center>");
    res.end();
  }
  if(password != confirmPass ){
    res.writeHead(200,{'Content-Type': contentType.html});
    res.write(content.signUpPage);
    res.write("<center><h2><font color = 'white'> Passwords do not match!!<font><h2/></center>");
  }
  else{
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