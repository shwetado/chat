var url = require('url');
var fs = require('fs');
var msgFileName = 'data/messages.json';
var messages = fs.existsSync(msgFileName) && JSON.parse(fs.readFileSync(msgFileName,"utf-8")) || [];
var template = fs.readFileSync('./view/template.html',"utf-8");
var bg_jpg = fs.readFileSync('./public/images/bg.jpg');
var fav_ico = fs.readFileSync('./public/images/favicon.ico');
var temp = fs.readFileSync('./public/login.html','utf-8');
var contentType = {html:'text/html',jpg:'image/jpeg',ico:'image/x-icon'};

var handler = {};
handler['/template.html'] = function(req,res){
  res.writeHead(200, {'Content-Type': contentType.html});
  if(url.parse(req.url,true).query.pswrd == "a"){
    var userid = url.parse(req.url,true).query.userid;
    res.write(template.replace(/{MESSAGES}/,messages.join('<br/>')).replace(/{USERNAME}/,userid)); }
  else{
    res.write(temp); 
    res.write("<h2><font color = 'white'> Incorrect password please try again!<font><h2/>");
  }
  res.end();
};

handler['/chat'] = function(req,res){
  var tab = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  var userid = url.parse(req.url,true).query.name;
  var query = url.parse(req.url,true).query; 
  var user = query.name ;
  var msg = query.message;
  var ip = (req.connection.remoteAddress);
  var date = new Date().toString().split('G')[0];
  var item = user + " [ " + ip + " ] " + " : " + tab + msg + tab + " ( " + date + " ) ";
  user && msg && messages.push(item) && fs.writeFileSync(msgFileName,JSON.stringify(messages));
  res.writeHead(200, {'Content-Type': contentType.html});
  res.write(template.replace(/{MESSAGES}/,messages.join('<br/>')).replace(/{USERNAME}/,userid)); 
  res.end();
}

handler['/bg.jpg'] = function(req,res){
	res.writeHead(200,{'Content-Type': contentType.jpg});
  res.write(bg_jpg); 
	res.end();	
};

handler['/favicon.ico'] = function(req,res){
	res.writeHead(200,{'Content-Type': contentType.ico});
  res.write(fav_ico); 
	res.end();	
};

handler['/'] = function(req,res){
  var req_url = url.parse(req.url,true);
  res.writeHead(200,{'Content-Type': contentType.html});
  res.write(temp); 
  res.end();  
};

exports.routes = handler;