var http = require('http');
var url = require('url');
var routes = require('./chat_routes').routes;
var fs = require('fs')

var out_of_stock = function(req,res){
	res.writeHead(404, {'Content-Type': 'text/html'});
	res.write('I dont have it');
	res.end();
};

var serve = function (req,res){
	var req_url = url.parse(req.url,true);
	var method = routes[req_url.pathname] || out_of_stock;
	method(req,res);};

http.createServer(serve).listen(8282);
console.log('Server running at http://localhost:8282/');