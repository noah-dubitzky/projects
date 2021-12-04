
//in this scene, the player learns how to control their selected character

class Intro_Scene_2 extends Phaser.Scene {
  constructor() { 
    super("Intro_Scene_2");
	
  }

  create() {
		
		//declare global variable
		this.config = config;
		
		//create the scene imagery
		this.background = this.add.image(0, config.height, 'background').setScale(config.width/425); //set and scale the background pic
		this.background.setOrigin(0.08,1); //correctly set its origin
		
		//create platform group and adjust platform height and width
        var bricks = this.physics.add.staticGroup();
		
		//use config.width to size the bricks relative to the size of the window
		var brickLength = config.width*.032;
		var brickHeight = config.width*.0256;
		
		//place each brick next to eachother along the entire way of the screen
		for(var i = 0; i < config.width/brickLength; i++){
			bricks.create(i*brickLength, config.height, 'brick').setScale(config.width*.00008).setOrigin(0,1).refreshBody(); //place a brick
		}
		
		//create tree size var relative to the size of the window
		var treeHeight = config.height*.0025; 
		
		//create 3 trees along the screen 
		this.add.image(config.width*.25, config.height - brickHeight, 'tree3').setScale(treeHeight*.9).setOrigin(0,1);
		this.add.image(config.width*.1, config.height - brickHeight, 'tree2').setScale(treeHeight*.8).setOrigin(0,1);
		this.add.image(config.width*.7, config.height - brickHeight, 'tree2').setScale(treeHeight*.8).setOrigin(0,1);
		
		
		//create an invisible plate for the large example sprite to stand on
		this.plate = this.physics.add.staticGroup(); //invisible platform that the larger character stands and performs on
		this.plate.create(config.width*0.6, config.height*0.5, 'Inv_Plate').setScale(config.width*.0001).setOrigin(0.5,0.5).refreshBody(); //place the platform right under the sprite
		
		
		//create the physics groups for the sprites
		this.characters = this.physics.add.group();
		this.mainPlayers = this.physics.add.group(); //create the main players group, holds the characters who interact with the ground
		this.goodArrow = this.add.group();
		
		//create the sprite based on the chosen player. Also, get rid of their health bar
		if(config.mainPlayer == "knight"){
			
			this.playerOne = new KnightPlayer({scene: this, x: (config.width * 0.5), y: (config.height * 0.75) }); //create the example player
			this.playerOne.health_bar.destroy(); //get rid of its health bar
			
		}else if(config.mainPlayer == "archer"){
			
			this.playerOne = new ArcherPlayer({scene: this, x: (config.width * 0.5), y: (config.height * 0.8) }); //create the example player
			this.playerOne.health_bar.destroy(); //get rid of its health bar
			
		}else if(config.mainPlayer == "lumberjack"){
			
			this.playerOne = new LumberJackPlayer({scene: this, x: (config.width * 0.5), y: (config.height * 0.8) }); //create the example player
			this.playerOne.health_bar.destroy(); //get rid of its health bar
			
		}
		
		this.playerOne.body.setCollideWorldBounds(true);
		
		//create the collider between the ground and the main players and the arrows 
		this.physics.add.collider(this.characters, bricks, function(enemy, brick){
			
			enemy.hitGround(); //runs hitground functions
			
		});  //create collider between archer and platforms
		
		this.physics.add.collider(this.goodArrow, bricks, function(goodArrow, bricks){ //create collider between the arrows and platforms
			
			goodArrow.destroy(); //destroy the arrow on collision 
			
		});  
		
		
		if(config.mainPlayer == "lumberjack" || config.mainPlayer == "knight"){
			
			setTimeout(this.addTextBubbleWarrior, 1000, this); //run this function for the warriors 
			
			this.playerOne.targets = [this.goodArrow];
			
		}else{
			
			setTimeout(this.addTextBubbleArcher, 1000, this); //run this function for the archer
			
		}

  }
  
  update(){
	  
	 //update the arrow
	 for(var i = 0; i < this.goodArrow.getChildren().length; i++) {
		var arrow = this.goodArrow.getChildren()[i];
		arrow.update();
	 }
	
  }
  
  addTextBubbleWarrior(scene){
		
		//create the image of the villager explainer
		scene.villager = scene.add.image(config.width/5, config.height/5, 'Villager').setScale(config.width/1500).setOrigin(0,0); //correctly set its origin; //set and scale the villager scene pic
		
		//define the text that is shown to the player 
		var text = [ 
		"Greetings traveler...", 
		"our village is under attack!", 
		"We need you to rid our village of the evil invaders!",
		"Use A and D to move left and right, and press SPACE to attack",
		"Press W to jump, and press SPACE while in the air for a super attack",
		"Press shift to hold up a shield",
		"click to begin. Destroy all enemies to advance."];
		
		var index = 0; //set the index for the text array
		
		//create the text element for the scene
		var fontMain = config.width * 0.13 + "% Comic Sans"; 
		var styleMain = { font: fontMain, fill: "Black", align: "center" };
		var textMain = scene.add.text(config.width*.5, config.height*.35, text[index], styleMain);
		textMain.setOrigin(0.45);
		
		
		//create the event listener for the body 
		$('body').on('click', function(){
			
			textMain.destroy(); //destroy the text
			index++; //increment the index so that it goes to the next text string 
			
			textMain = scene.add.text(config.width*.5, config.height*.35, text[index], styleMain); //create new text element with new text
			textMain.setOrigin(0.45); //keep the origin
			
			if(index >= 3){
				
				//if its the 3rd text page
				
				scene.villager.x = 0; //change the position of the text window
				textMain.x = config.width*0.26; //change the position of the text
				
			}
			
			if(index == 3){
				
				//create the example sprite called playerExample
				scene.playerExample = scene.add.sprite(config.width*.60,config.height*.35, config.mainPlayer ).setOrigin(0.3,0.5);
				scene.physics.world.enableBody(scene.playerExample); //give it physics
				scene.playerExample.setScale(config.width*.001); //scale the example player
				scene.playerExample.anims.play( config.mainPlayer + '_forward', true); //play the forward animation 
	
				scene.physics.add.collider(scene.playerExample, scene.plate); //create collider between the example sprite and the plate its on 
				
				scene.showSpriteMove(scene.playerExample, scene); //play the initial showSpriteMove function to demostrate its movement 
				
				scene.example1 = setInterval( scene.showSpriteMove, 2500, scene.playerExample, scene); //start the interval of the showSpriteMove
				
			}else if(index == 4){
				
				clearInterval( scene.example1 ); //stop the interval of the showSpriteMove function 
				
				clearTimeout( scene.timeOut ); //stop the timeout within each of the set interval functions below 
				
				scene.showSpriteAttack(scene.playerExample, scene); //set the interval to show the player example function
				
				scene.example2 = setInterval( scene.showSpriteAttack, 2000, scene.playerExample, scene); //set the interval of the showSpriteAttack function 
				
			}else if(index == 5){
				
				clearInterval( scene.example2 ); //clear the interval
				
				clearTimeout( scene.timeOut ); //clear the timeout
				
				scene.showSpriteShield(scene.playerExample, scene); //show the sheild 
				
				scene.example3 = setInterval( scene.showSpriteShield, 2000, scene.playerExample, scene); //set the interval 
				
			}else if(index == 6){
				
				clearInterval( scene.example3 ); //clear the interval
				 
				clearTimeout( scene.timeOut ); //clear the timeout
				
				scene.showSpriteMove(scene.playerExample, scene); //go back to the showSpriteMove function
				
				scene.example1 = setInterval( scene.showSpriteMove, 2000, scene.playerExample, scene); //start the interval
				
			}
			
			if(index == text.length){ //once its done 
				
				$('body').unbind(); //unbind the event listener of the body
				
				scene.scene.start("LevelOne"); //start the main scene
				
				clearInterval( scene.example1 ); //clear the interval
				
			}
	
		});
		
		//make the cursor type auto
		$('body').css({ 
			
			'cursor': 'auto'
			
		});
		
	
  }
  
  addTextBubbleArcher(scene){
	  
		scene.villager = scene.add.image(config.width/5, config.height/5, 'Villager').setScale(config.width/1500); //set and scale the background pic
		scene.villager.setOrigin(0,0); //correctly set its origin
		
		var text = [ 
		"Greetings traveler...", 
		"our village is under attack!", 
		"We need you to rid our village of the evil invaders!",
		"Use A and D to move left and right, and press W to jump",
		"Press SPACE to fire an arrow",
		"click to begin. Destroy all enemies to advance."];
		
		var index = 0; //set the index for the text array
		
		//create the text element for the scene
		var fontMain = config.width * 0.13 + "% Comic Sans"; 
		var styleMain = { font: fontMain, fill: "Black", align: "center" };
		var textMain = scene.add.text(config.width*.5, config.height*.35, text[index], styleMain);
		textMain.setOrigin(0.45);
		
		//create the event listener for the body 
		$('body').on('click', function(){
			
			textMain.destroy();//destroy the text
			index++; //increment the index so that it goes to the next text string 
			
			textMain = scene.add.text(config.width*.5, config.height*.35, text[index], styleMain); //create new text element with new text
			textMain.setOrigin(0.45); //keep the origin
				
			if(index >= 3){
				
				//if its the 3rd text page
				
				scene.villager.x = 0; //change the position of the text window
				textMain.x = config.width*.26; //change the position of the text
				
			}
			
			if(index == 3){
				
				//create the example sprite called playerExample
				scene.playerExample = scene.add.sprite(config.width*.60,config.height*.37, config.mainPlayer ).setOrigin(0.3,0.5);
				scene.physics.world.enableBody(scene.playerExample); //give it physics
				scene.playerExample.setScale(config.width*.001); //scale the sprite
				scene.playerExample.anims.play( config.mainPlayer + '_forward', true); //play the forward animation
				
				scene.physics.add.collider(scene.playerExample, scene.plate); 
				
				scene.showArcherMove(scene.playerExample, scene);
				
				scene.example1 = setInterval( scene.showArcherMove, 2500, scene.playerExample, scene);
				
			}else if(index == 4){
				
				clearInterval( scene.example1 );
				
				clearTimeout( scene.timeOut );
				
				scene.showArcherFire(scene.playerExample, scene);
				
				scene.example2 = setInterval( scene.showArcherFire, 2500, scene.playerExample, scene);
				
			}else if(index == 5){
				
				clearInterval( scene.example2 );
				
				clearTimeout( scene.timeOut );
				
				scene.example3 = setTimeout( function(){
					
					scene.playerExample.anims.play(config.mainPlayer + "_stop", true);
					
				}, 1000);
				
				
			}
			
			if(index == text.length){
				
				$('body').unbind();
				
				scene.scene.start("LevelOne");
				
				clearTimeout( scene.example3 );
				
			}
	
		});
		
		$('body').css({
			
			'cursor': 'auto'
			
		});
		
	
  }
  
  //plays to show the warrior movement where the sprite attacks forwars and runs 
  showSpriteMove(sprite, scene){
		
	  sprite.anims.setTimeScale(0.3);
      sprite.anims.play(config.mainPlayer + '_attack_forward', true);
	  
	  scene.timeOut = setTimeout(function(){
		  
		  sprite.anims.setTimeScale(1);
		  sprite.anims.play(config.mainPlayer + '_forward', true);
		  
	  }, 500);
	  
  }
  
  //show the attack of the warrior when it jumps and then attacks
  showSpriteAttack(sprite, scene){
		
		
	  sprite.body.setGravityY(100);
	  sprite.anims.setTimeScale(1);
      sprite.anims.play(config.mainPlayer + '_stop', true);
	 
	  sprite.body.velocity.y = -1 * (config.width / 4);
	  
	  scene.timeOut = setTimeout(function(){
		 
		 sprite.anims.play(config.mainPlayer + '_jump_attack', true);
		 sprite.body.setGravityY(3000);
		  
	  }, 500);
	  
  }
  
  //show the warriors sheild 
  showSpriteShield(sprite, scene){
	  
	  sprite.anims.play(config.mainPlayer + '_forward', true);
	  
	  scene.timeOut = setTimeout(function(){
		 
		 sprite.anims.play(config.mainPlayer + '_shield', true);
		  
	  }, 1000);
	  
  }
  
  //show the archer's movement 
  showArcherMove(sprite, scene){
	  
	  sprite.anims.play(config.mainPlayer + '_forward', true);
	  
	  scene.timeOut = setTimeout(function(){
		 
	  sprite.anims.play(config.mainPlayer + '_stop', true);
		 
	  sprite.body.velocity.y = -1 * (config.width / 4);
		  
	  }, 1000);
	  
  }
  
  //show the archer's firing animations
  showArcherFire(sprite, scene){
	  
	  sprite.anims.play(config.mainPlayer + '_load', true);
	  
	  scene.timeOut = setTimeout(function(){
		 
		 sprite.anims.play(config.mainPlayer + '_fire', true);
		  
	  }, 1000);
	  
  }
  
}



