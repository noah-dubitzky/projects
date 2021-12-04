
class EndingScene extends Phaser.Scene{
	
	constructor() {
		super("EndingScene");
		
	}
	
	create(){
		
		this.config = config; //allow for a global variable 
		
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
		
		this.add.image(config.width*.1, config.height - brickHeight, 'House3').setScale(0.5).setOrigin(0,1);
		this.add.image(config.width*.21, config.height - brickHeight, 'House').setScale(0.5).setOrigin(0,1);
		this.add.image(config.width*.15, config.height - brickHeight, 'House').setScale(0.6).setOrigin(0,1);
		this.add.image(config.width*.02, config.height - brickHeight, 'House').setScale(0.5).setOrigin(0,1);
		this.add.image(-config.width*.035, config.height - brickHeight, 'House').setScale(0.4).setOrigin(0,1);
		this.add.image(config.width*.3, config.height - brickHeight, 'House3').setScale(0.5).setOrigin(0,1);
		
		this.characters = this.physics.add.group();
		this.mainPlayers = this.physics.add.group(); //create the main players group
		this.goodArrow = this.physics.add.group();
		
		this.villager1 = new Villager({scene: this, x: (config.width * 0.1), y: (config.height * 0.9), celebrate: true });
		this.villager2 = new Villager({scene: this, x: (config.width * 0.15), y: (config.height * 0.9), celebrate: true });
		this.villager3 = new Villager({scene: this, x: (config.width * 0.18), y: (config.height * 0.9), celebrate: true });
		this.villager4 = new Villager({scene: this, x: (config.width * 0.3), y: (config.height * 0.9), celebrate: true });
		this.villager1 = new Villager({scene: this, x: (config.width * 0.33), y: (config.height * 0.9), celebrate: true });
		this.villager2 = new Villager({scene: this, x: (config.width * 0.41), y: (config.height * 0.9), celebrate: true });
		this.villager3 = new Villager({scene: this, x: (config.width * 0.48), y: (config.height * 0.9), celebrate: true });
		this.villager4 = new Villager({scene: this, x: (config.width * 0.43), y: (config.height * 0.9), celebrate: true });
		
		
		//determine which player is going to be created 
		if(config.mainPlayer == "knight"){
			
			this.playerOne = new KnightPlayer({scene: this, x: (config.width * 0.05), y: (config.height * 0.9) });
			
			this.playerOne.targets = [this.goodArrow];
			
		}if(config.mainPlayer == "lumberjack"){
			
			this.playerOne = new LumberJackPlayer({scene: this, x: (config.width * 0.05), y: (config.height * 0.9) });
			
			this.playerOne.targets = [this.goodArrow];
			
		}else if(config.mainPlayer == "archer"){
			
			this.playerOne = new ArcherPlayer({scene: this, x: (config.width * 0.05), y: (config.height * 0.9) });
			
		}
		
		//set up collider between projectiles and the bricks
		//good arrow and bricks
		this.physics.add.collider(this.goodArrow, this.bricks, function(goodArrow, bricks){ //create collider between gladiator and platforms
			
			goodArrow.destroy();
			
		}); 
		
		this.physics.add.collider(this.characters, this.bricks, function(enemy, brick){
			
			enemy.hitGround();
			
		});  //create collider between archer and platforms
		
		//prevent characters from leaving the confines of the scene
		for(var i = 0; i < this.characters.getChildren().length; i++) {
			
			var character = this.characters.getChildren()[i];
			character.body.setCollideWorldBounds(true);
			
		}
		
		setTimeout(this.addTextBubbleHelper, 1000, this); //run this function for the warriors 
		
		
	}
	
	
	addTextBubbleHelper(scene){
	  
	  
		scene.villager = scene.add.image(config.width/2, config.height/5, 'Villager').setScale(1.1); //set and scale the villager scene pic
		scene.villager.setOrigin(0.5,0); //correctly set its origin
		
		//define the text that is shown to the player 
		var text = [ 
		"Congratulations!", 
		"You have defeated the enemies and secured our village!", 
		"Let us know if there is any way to repay you"];
		
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
			
			if(index == text.length){ //once the test is done
				
				scene.scene.start('LoadingScene');
				
			}
		});
		
		$('body').css({
			
			'cursor': 'auto'
			
		});
	  
  }
	
}




