class Intro_Helper_Scene extends Phaser.Scene {
  constructor() {
    super("Intro_Helper_Scene");
	
	
  }
  
  preload(){
	
  }

  create() {
	  
	    this.config = config;
		 
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
		
		this.characters = this.physics.add.group();
		
		this.enemyNPCs = this.physics.add.group();
		this.mainPlayers = this.physics.add.group(); //create the main players group, holds the characters who interact with the ground
		this.goodArrow = this.physics.add.group();
		this.helpers = this.physics.add.group();
		
		//create an lumberjack using the lumberjackPlayer class
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
		
		//create the collider between the ground and the main players 
		this.physics.add.collider(this.characters, bricks, function(enemy, brick){
			
			enemy.hitGround(); //runs hitground functions
			
		});  //create collider between archer and platforms
		
		 this.physics.add.collider(this.goodArrow, bricks, function(goodArrow, bricks){ //create collider between the arrows and platforms
			
			goodArrow.destroy(); //destroy the arrow on collision 
			
		});  
		
		//prevent characters from leaving the confines of the scene
		for(var i = 0; i < this.characters.getChildren().length; i++) {
			
			var character = this.characters.getChildren()[i];
			character.body.setCollideWorldBounds(true);
			
		}
	
		
		setTimeout(this.addTextBubbleHelper, 1000, this); //run this function for the warriors 
		
		setTimeout(this.createHelper, 1500, this);
	  

  };

  update(){
	 
	  
  };
  
  addTextBubbleHelper(scene){
	  
	  
		scene.villager = scene.add.image(config.width/2, config.height/5, 'helper_player_scene').setScale(scene.config.width / 1400); //set and scale the villager scene pic
		scene.villager.setOrigin(0.5,0); //correctly set its origin
		
		//define the text that is shown to the player 
		var text = [ 
		"Hello", 
		"Im Jade, and I want to help you protect our village", 
		"If its ok, I will follow you around and help you kill enemies",
		"Click to continue"];
		
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
			
			textMain = scene.add.text(config.width*.43, config.height*.35, text[index], styleMain); //create new text element with new text
			textMain.setOrigin(0.45); //keep the origin
			
			if(index == text.length){
				
				scene.scene.start('LevelFour');
				
			}
		});
		
		$('body').css({
			
			'cursor': 'auto'
			
		});
	  
  }
  
	createHelper(scene){
		/*
			scene.playerExample = scene.add.sprite(config.width*.57,config.height*.8, "helper" ).setOrigin(0.3,0.5);
			scene.playerExample.setScale(config.width*.00024); //scale the example player
			scene.physics.world.enableBody(scene.playerExample); //give it physics
			scene.playerExample.anims.play( 'helper_MPC_stop', true); //play the forward animation 
			scene.helpers.add(scene.playerExample);
			
			scene.playerExample.body.setSize(68, 116, true); //adjust the size of the hitbox
			scene.playerExample.body.setOffset(16,0); //adjust the position of the hitbox
		*/
		
		scene.helperOne = new Helper({scene: scene, x: (config.width * 0.4), y: (config.height * 0.9) });
			
	};

}






