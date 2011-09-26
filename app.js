var http = require('http'),
url = require('url'),
path = require('path'),
fs = require('fs'),
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
		res.end();
		});
	});
});

server.listen(8000);

var io = require('socket.io').listen(server);

var players = [];

io.sockets.on('connection', function(socket){
	
  	socket.on('message', function(player){
		
			console.log("MENSAJE : " + player);
		
			if(player.action == "enter"){
			
				// A new player, send data to the web.
				player.sessionId = socket.id;
				socket.json.send(player);
				
				// Found another player waiting
				var found = false;

				for(i in players){
					if(players[i].enemy == null){
						
						player.enemy = {
							sessionId : players[i].sessionId,
							name : players[i].name
						}
										
						players[i].enemy = {
							sessionId : player.sessionId,
							name : player.name
						}

						found = true;
						break;
					}
				}
				
				// If didn't find another player waiting
				if(!found){
					
					player.action = "wait";
					player.type="O";
					
					socket.json.send(player);
					
				// Another player found.
				}else{
					// Send message by socket.
					
					player.action="play"; // Let's play
					player.type = "X";
					
					socket.json.send(player);
					io.sockets.sockets[player.enemy.sessionId].json.send(player);
				}

				players.push(player);
			}
			else {
				
				/*if(typeof player.enemy == "undefined"){
					socket.json.send(player);
				}else{*/
					socket.json.send(player);
					io.sockets.sockets[player.enemy.sessionId].json.send(player);
				//}
					
			}
					
	});
	
});
