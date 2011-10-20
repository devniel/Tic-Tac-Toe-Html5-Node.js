/** Michi */
/**
 * CEIDS
 * 
 * @author Daniel Flores
 * @license The MIT license.
 * @copyright Copyright (c) 2011 Stendev
*/

function box(obj,canvas,ctx,posx,posy,id){

	this.id = id;
	
	this.posx = posx;
	
	this.posy = posy;
	
	this.width = 100;
	
	this.height = 100;
	
	this.colored = false;
	
	this.type = null;

	/*this.onmousemove = function(e){

		if(e.layerX >= this.posx && e.layerX <= (this.posx + this.width) && e.layerY >= this.posy && e.layerY<= (this.posy + this.height)){

			ctx.fillStyle = "#FFF";
			ctx.fillRect(this.posx,this.posy,this.width,this.height);

		}
		else
		{

			ctx.fillStyle = "#FFF";
			ctx.fillRect(this.posx,this.posy,this.width,this.height);

		}
	}*/

	/*this.changeColor = function(e){

		if(e.layerX >= this.posx && e.layerX <= (this.posx + this.width) && e.layerY >= this.posy && e.layerY<= (this.posy + this.height)){
			ctx.fillStyle = "#F00";
			ctx.fillRect(this.posx,this.posy,this.width,this.height);
		}

	}
	*/
	
	this.drawCircle = function(e){

		if(e.layerX >= this.posx && e.layerX <= (this.posx + this.width) && e.layerY >= this.posy && e.layerY<= (this.posy + this.height)){
		
			if(this.colored == false){
				
				ctx.moveTo(this.posx + this.width/2 + this.width/2,this.posy + this.height/2);
                ctx.arc(this.posx + this.width/2, this.posy + this.height/2, this.width/2, 0, Math.PI*2, false);
				ctx.strokeStyle = "#000";

				ctx.stroke();
				this.colored = true;
				this.type = "O";
				
			}
		}
	}

	this.drawX = function(e){


		if(e.layerX >= this.posx && e.layerX <= (this.posx + this.width) && e.layerY >= this.posy && e.layerY<= (this.posy + this.height)){
			
			if(this.colored == false){
				
				ctx.moveTo(this.posx,this.posy);
                ctx.lineTo(this.posx + this.width,this.posy + this.height);
				ctx.moveTo(this.posx + this.width,this.posy);
				ctx.lineTo(this.posx,this.posy + this.height);
				ctx.strokeStyle = "#000";

				ctx.stroke();
				
				this.colored = true;
				this.type = "X";
				
			}
		}
	}
}



function boardGame(){

		this.canvas = document.getElementById("canvas");

		this.ctx = this.canvas.getContext("2d");	

		this.height = this.canvas.height;

		this.width = this.canvas.width;

		this.boxes = [];
		
		this.setName = function(name){
				this.name = name;
		}
		
		this.drawTable = function() {
			
			// Horizontal		

			this.ctx.strokeStyle = "#000";

			this.ctx.moveTo(100,0);

			this.ctx.lineTo(100,this.height);

			this.ctx.moveTo(200,0);

			this.ctx.lineTo(200,this.height);

			this.ctx.moveTo(0,100);

			this.ctx.lineTo(this.width,100);

			this.ctx.moveTo(0,200);

			this.ctx.lineTo(this.width,200);

			this.ctx.stroke();

		}

		this.startBoxes = function(){

			var bx = 0;

			for(i=0;i<=200;i+=100){

				for(j=0;j<=200;j+=100){						

					this.boxes[bx] = new box(this,this.canvas,this.ctx,i,j,bx);
					bx++;
					
				}
			}			
		}



		this.onclick = function(_player){
				socket.json.send(_player);
		}
		
		this.drawFromOtherPlayer = function(e){
			
			if(e.type == "O"){
				
				//alert(":o");

				for(i in this.boxes){

					this.boxes[i].drawCircle(e);
					
				}
				
			}
			else if(e.type == "X"){
				
				for(i in this.boxes){

					this.boxes[i].drawX(e);

				}
			}
			
			this.review();
			
		}
		
		// UGLY CODE here XD

		this.review = function(){

				if(this.boxes[0].colored && this.boxes[1].colored && this.boxes[2].colored && ( this.boxes[0].type == player.type) && (this.boxes[1].type == player.type) && (this.boxes[2].type == player.type)){
					
					player.action = "WIN"
					
					socket.json.send(player);
					
				}
				else if(this.boxes[3].colored && this.boxes[4].colored && this.boxes[5].colored && ( this.boxes[3].type == player.type) && (this.boxes[4].type == player.type) && (this.boxes[5].type == player.type)){
					
					player.action = "WIN"
					
					socket.json.send(player);
					
				}
				else if(this.boxes[6].colored && this.boxes[7].colored && this.boxes[8].colored && ( this.boxes[6].type == player.type) && (this.boxes[7].type == player.type) && (this.boxes[8].type == player.type)){
					
					player.action = "WIN"
					
					socket.json.send(player);
					
				}
				else if(this.boxes[0].colored && this.boxes[3].colored && this.boxes[6].colored && ( this.boxes[0].type == player.type) && (this.boxes[3].type == player.type) && (this.boxes[6].type == player.type)){
					
					player.action = "WIN"
					
					socket.json.send(player);
					
				}
				else if(this.boxes[1].colored && this.boxes[4].colored && this.boxes[7].colored && ( this.boxes[1].type == player.type) && (this.boxes[4].type == player.type) && (this.boxes[7].type == player.type)){
					
					player.action = "WIN"
					
					socket.json.send(player);
					
				}
				else if(this.boxes[2].colored && this.boxes[5].colored && this.boxes[8].colored && ( this.boxes[2].type == player.type) && (this.boxes[5].type == player.type) && (this.boxes[8].type == player.type)){
					
					player.action = "WIN"
					
					socket.json.send(player);
					
				}
				else if(this.boxes[0].colored && this.boxes[4].colored && this.boxes[8].colored && ( this.boxes[0].type == player.type) && (this.boxes[4].type == player.type) && (this.boxes[8].type == player.type)){
					
					player.action = "WIN"
					
					socket.json.send(player);
					
				}
				else if(this.boxes[2].colored && this.boxes[4].colored && this.boxes[6].colored && ( this.boxes[2].type == player.type) && (this.boxes[4].type == player.type) && (this.boxes[6].type == player.type)){
					
					player.action = "WIN"
					
					socket.json.send(player);
					
				}
		}
}
