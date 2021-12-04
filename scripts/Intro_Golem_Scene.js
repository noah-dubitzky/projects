class Intro_Golem_Scene extends Phaser.Scene {
  constructor() {
    super("Intro_Golem_Scene");
	
	
  }
  
  preload(){
	
  }

  create() {
	  
	    config.helper = true;
		this.config = config; //allow for a global variable 
		var scene = this;
		
		this.displayPage = true;
		
		this.playerOneIsDead = false;
		
		//define the length and height of all of the bricks relative to the size of the window
		var brickLength = config.width*.032; 
		var brickHeight = config.width*.0256;
		
		this.background = this.add.image(0, config.height, 'background').setScale(config.width/425); //set and scale the background pic
		this.background.setOrigin(0.08,1); //correctly set its origin
		
        this.bricks = this.physics.add.staticGroup(); //create a physics group for the bricks 
		
		//place each brick next to eachother along the entire way of the screen
		for(var i = 0; i < config.width/brickLength; i++){
			this.bricks.create(i*brickLength, config.height, 'brick').setScale(config.width*.00008).setOrigin(0,1).refreshBody();
		}
		
		//create tree size var relative to the size of the window
		var treeHeight = config.height*.0025; 
		
		//create 3 trees along the screen 
		this.add.image(config.width*.25, config.height - brickHeight, 'tree3').setScale(treeHeight*.9).setOrigin(0,1);
		this.add.image(config.width*.1, config.height - brickHeight, 'tree2').setScale(treeHeight*.8).setOrigin(0,1);
		this.add.image(config.width*.7, config.height - brickHeight, 'tree2').setScale(treeHeight*.8).setOrigin(0,1);
	  
		this.add.image(config.width*.1, config.height - brickHeight, 'House3').setScale(config.width/2500).setOrigin(0,1);
		this.add.image(config.width*.21, config.height - brickHeight, 'House').setScale(config.width/2700).setOrigin(0,1);
		this.add.image(config.width*.15, config.height - brickHeight, 'House').setScale(config.width/2500).setOrigin(0,1);
		this.add.image(config.width*.02, config.height - brickHeight, 'House').setScale(config.width/2400).setOrigin(0,1);
		this.add.image(-config.width*.035, config.height - brickHeight, 'House').setScale(config.width/2500).setOrigin(0,1);
		this.add.image(config.width*.3, config.height - brickHeight, 'House3').setScale(config.width/2600).setOrigin(0,1);
	  
	  
		this.characters = this.physics.add.group();
	  
		this.goodArrow = this.add.group(); //create the arrow group
		this.badArrow = this.add.group(); //create the arrow group
		this.boulders = this.physics.add.group();
		
		this.mainPlayers = this.physics.add.group(); //create the main players group
		this.enemyNPCs = this.physics.add.group(); //create Gladiator Players group
		
		this.helpers = this.physics.add.group();
		
		//determine which player is going to be created 
		if(config.mainPlayer == "knight"){
			
			this.playerOne = new KnightPlayer({scene: this, x: (config.width * 0.05), y: (config.height * 0.9) });
			
		}if(config.mainPlayer == "lumberjack"){
			
			this.playerOne = new LumberJackPlayer({scene: this, x: (config.width * 0.05), y: (config.height * 0.9) });
			
		}else if(config.mainPlayer == "archer"){
			
			this.playerOne = new ArcherPlayer({scene: this, x: (config.width * 0.05), y: (config.height * 0.9) });
			
		}
		
		this.playerOne.speed = 0;
		this.playerOne.getHitLeft = true;
		this.playerOne.jumpStrength = 0;
					
		this.helperOne = new Helper({scene: this, x: (config.width * 0.05), y: (config.height * 0.9) });
		this.mainPlayers.add(this.helperOne); //add the sprite to the helper class
		
		this.helperOne.attackDistance = config.width*0.5;
		
		//prevent characters from leaving the confines of the scene
		for(var i = 0; i < this.characters.getChildren().length; i++) {
			
			var character = this.characters.getChildren()[i];
			character.body.setCollideWorldBounds(true);
			
		}
		
		this.physics.add.collider(this.characters, this.bricks, function(enemy, brick){
			
			enemy.hitGround(); //runs hitground functions
			
		});  //create collider between archer and platforms
			
		//set up colliders for the arrows
		this.physics.add.overlap(this.mainPlayers, this.badArrow, this.arrowHit, null, this);
		
		//set up the colliders
		this.physics.add.collider(this.enemyNPCs, this.bricks, function(enemy, brick){
			
			enemy.hitGround(); //runs certain functions when the gladiator hits the ground
			
		});  //create collider between gladiator and platforms
		
		//good arrow and bricks
		this.physics.add.collider(this.goodArrow, this.bricks, function(goodArrow, bricks){ //create collider between gladiator and platforms
			
			goodArrow.destroy();
			
		}); 
		
		//bad arrow and bricks
		this.physics.add.collider(this.badArrow, this.bricks, function(goodArrow, bricks){ //create collider between gladiator and platforms
			
			goodArrow.destroy();
			
		}); 
		
		//good arrow and bricks
		this.physics.add.collider(this.boulders, this.bricks, function(boulder, bricks){ //create collider between gladiator and platforms
			
			boulder.destroySelf();
			
		}); 
		
		//set up colliders for the arrows
		this.physics.add.overlap(this.enemyNPCs, this.goodArrow, this.arrowHit, null, this);
		
		this.enemyGolem = new GolemMPC({scene: this, x: (config.width * 1), y: (config.height * 0.8) });
		this.enemyGolem.body.setCollideWorldBounds(true);
		this.enemyGolem.targets = [this.helpers];
		this.enemyGolem.selectedTarget = this.helperOne;
		
		this.enemyGolem.damage = 10;

  };

  update(){
	  
	  if(this.helperOne.isDead == true && this.displayPage == true){
		  
		  setTimeout( this.addTextBubbleHelper, 1000, this);
		  
		  this.displayPage = false; //prevent function from running again
		  
	  }
	 
	  
  };
  
  
  addTextBubbleHelper(scene){
	  
	  
		scene.villager = scene.add.image(config.width/2, config.height/5, 'Villager').setScale(1.1); //set and scale the villager scene pic
		scene.villager.setOrigin(0.5,0); //correctly set its origin
		
		//define the text that is shown to the player 
		var text = [ 
		"OH NO!!!", 
		"The Golem has killed your helper!", 
		"Kill the Golem to Avenge Jade and save the village",
		"Click to continue"];
		
		var index = 0; //set the index for the text array
		
		//create the text element for the scene
		var fontMain = config.width * 0.13 + "% Comic Sans"; 
		var styleMain = { font: fontMain, fill: "Black", align: "center" };
		var textMain = scene.add.text(config.width*.53, config.height*.35, text[index], styleMain);
		textMain.setOrigin(0.45);
	  
		//create the event listener for the body 
		$('body').on('click', function(){
			
			textMain.destroy();//destroy the text
			index++; //increment the index so that it goes to the next text string 
			
			textMain = scene.add.text(config.width*.53, config.height*.35, text[index], styleMain); //create new text element with new text
			textMain.setOrigin(0.45); //keep the origin
			
			if(index == text.length){
				
				scene.scene.start('LevelSix');
				
			}
		});
		
		$('body').css({
			
			'cursor': 'auto'
			
		});
	  
  }
	
	//runs when an arrow hits a sprite
  arrowHit(arrow, sprite){
	  
	  if(arrow.flipX){ 
		  
		sprite.getsHit("l", arrow.damage, arrow.knockBack);

	  }else{
		  
		sprite.getsHit("r", arrow.damage, arrow.knockBack);

	  }
	  arrow.destroy();
	  
  }

}