var http = require('http'),
url = require('url'),
path = require('path'),
fs = require('fs'),
sys = require('sys');

// In this case, I don't use Express.js for learning reasons.

var server = http.createServer(function(req,res){
	
	var uri = url.parse(req.url).pathname,
	filename = path.join(process.cwd(),uri);

	if(uri == "/") filename = path.join(__dirname,"/michi.html");

	// Filename also passes the styles, images and scripts, thats the reason because I write the file in binary format.
	// Otherwise you can use res.write(file,'text/html') , res.write(file,'application/json'), etc ;

	path.exists(filename,function(exists){
		
		if(!exists){
			res.writeHead(404,{'Content-Type':'text/plain'});
			res.end("File not found");
		}else{			
			fs.readFile(filename,"binary",function(err,file){
				if(err){
					res.writeHead(500,{'Content-Type':'text/plain'});
					res.end(err + "\n");
				}else{
						var type;
						if(filename.match(/(.html)$/i) != null){
							type = 'text/html';
						}else if(filename.match(/(.js)$/i) != null){
							type = 'text/javascript';
						}else if(filename.match(/(.css)$/i) != null){
							type = 'text/css';
						}

					res.writeHead(200, {'Content-Type': type });
					res.write(file,'binary');
					res.end();
				}
			});
		}
	});

});

// you can pase PORT as an argument in the shell
var PORT = process.env.PORT || 3000;

server.listen(PORT,function(){
	console.log("Listen on port : " + PORT );
});

var io = require('socket.io').listen(server);

var players = new Array();

io.sockets.on('connection', function(socket){
	
  	socket.on('message', function(player){
		
			console.log("Message : " + player);
		
			if(player.action == "enter"){
			
				// A new player, send data to the web.
				player.sessionId = socket.id;
				socket.json.send(player);

				// Found another waiting player.
				var found = false;

				for(var i in players){

				// Found another player waiting
				var found = false;

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
				
				// If didn't find another waiting player

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
				//}
			}
					
	});
	
});
