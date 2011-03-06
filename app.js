var http = require('http'),
url = require('url'),
path = require('path'),
fs = require('fs'),
io = require('socket.io'),
sys = require('sys');

server = http.createServer(function(req,res){
	
	var uri = url.parse(req.url).pathname;
	var filename = path.join(process.cwd(),uri);
	
	path.exists(filename,function(exists){
		if(!exists){
		res.writeHead(404,{'Content-Type':'text/plain'});
		res.end("No encontrado :(");
		}
		
		fs.readFile(filename,"binary",function(err,file){
			
		if(err){
				res.writeHead(500,{'Content-Type':'text/plain'});
				res.end(err + "\n");
				return;
		}
		
		res.writeHead(200);
		res.write(file,'binary');
		res.close();
		});
	});
});


server.listen(8000);

var socket = io.listen(server);

socket.on('connection', function(client){
		
  	client.on('message', function(player){
			
			socket.broadcast(player);
			
			console.log(player);
		
	});
	
});