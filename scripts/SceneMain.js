//increase registerHitSpeed and play animation faster to accomodate for spam clicking 
//allow archer player to fire while running 
class SceneMain extends Phaser.Scene {
  constructor(key) { 
    super(key);
	
	this.rect1;
	this.rect2;
	this.graphics;
	this.graphics1;
	
	this.nextLevel;
  }
  
  createScene(numGlad, numArch, numAxeMen){
		
		this.startBattle = false; //this variable is set to true once all of the enemy sprites have been created
		
		this.config = config; //allow for a global variable 
		this.displayEndScene = true; //allows the ending page to be displayed, prevents the ending page from being displayed multiple times
		this.sceneEnd = false; //indicates when the scene has ended, either when playerOne dies or when there are no more enemies
		var scene = this;
		
		this.startSpawning = false; 
		
		this.playerOneIsDead = false;
		
		this.enemyGladiators = [];
		this.enemyArchers = [];
		this.enemyAxeMen = [];
		
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
	  
	  
		this.playerOne;
	  
		this.characters = this.physics.add.group();
	  
		this.mainPlayers = this.physics.add.group(); //create the main players group
		this.enemyNPCs = this.physics.add.group(); //create Gladiator Players group
		this.helpers = this.physics.add.group();
		
		this.boulders = this.physics.add.group();
		this.goodArrow = this.add.group(); //create the arrow group
		this.badArrow = this.add.group(); //create the arrow group
		
		this.villagers = this.physics.add.group();
		var villIndex = 0;
		
		this.StrengthPowerUps = this.physics.add.group();
		
		this.villager1 = new Villager({scene: scene, x: (config.width * 1), y: (config.height * 0.9) });
		this.villager2 = new Villager({scene: scene, x: (config.width * .98), y: (config.height * 0.9) });
		this.villager3 = new Villager({scene: scene, x: (config.width * 0), y: (config.height * 0.9) });
		this.villager4 = new Villager({scene: scene, x: (config.width * .02), y: (config.height * 0.9) });
		this.villager3 = new Villager({scene: scene, x: (config.width * .03), y: (config.height * 0.9) });
		this.villager4 = new Villager({scene: scene, x: (config.width * .95), y: (config.height * 0.9) });
		
		
		setTimeout(function(){
			
			var randInt = Math.random()/2 + 0.25;
			
			scene.powerUp1 = new StrengthPowerUp({scene: scene, x: (config.width * randInt), y: (config.height * 0.9) });
			
		}, 3500);
		
		//determine which player is going to be created 
		if(config.mainPlayer == "knight"){
			
			this.playerOne = new KnightPlayer({scene: this, x: (config.width * 0.5), y: (config.height * 0.9) });
			
		}if(config.mainPlayer == "lumberjack"){
			
			this.playerOne = new LumberJackPlayer({scene: this, x: (config.width * 0.5), y: (config.height * 0.9) });
			
		}else if(config.mainPlayer == "archer"){
			
			this.playerOne = new ArcherPlayer({scene: this, x: (config.width * 0.5), y: (config.height * 0.9) });
			
		}
		
		if(config.helper){
			
			this.helperOne = new Helper({scene: this, x: (config.width * 0.05), y: (config.height * 0.9) });
			
		}
		
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
		
		//set up colliders for the arrows
		this.physics.add.overlap(this.enemyNPCs, this.goodArrow, this.arrowHit, null, this);
		
		//set up colliders for the powerups
		this.physics.add.overlap(this.mainPlayers, this.StrengthPowerUps, this.powerUp, null, this);
		
		//between power ups and bricks
		this.physics.add.collider(this.StrengthPowerUps, this.bricks);  //create collider between powerUps and platforms
		
		
		//set up collider between projectiles and the bricks
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
	
		
		//In this portion of code, we create the enemy sprites one by one 
		
		//number of each type of enemy
		this.numGlad = numGlad;
		this.numArch = numArch;
		this.numAxeMen = numAxeMen;
		
		//index values for each enemy
		var i = 0;
		var j = 0;
		var k = 0;
		
		if(this.numGlad == 0 && this.numAxeMen == 0 && this.numArch == 0){
		
			this.enemyGolem = new GolemMPC({scene: this, x: (config.width * 1), y: (config.height * 0.8) });
			this.enemyGolem.body.setCollideWorldBounds(true);
			
		}
		
		setTimeout(function(){
			
			scene.startSpawning = true;
			
		}, 3000);
		
		this.createCharacters = setInterval(function(){
			  
			if(scene.startSpawning){
			  
			  if(i < scene.numGlad){
				 
				var randInt = Math.random(); 
				var startVal;
				 
				if(randInt < 0.5)
				{
					startVal = 0;
				}
				else
				{
					startVal = 1;
				}
				
				//create the enemy and add it to the enemyNPCs group
				scene.enemyGladiators[i] = new GladiatorMPC({scene: scene, x: (config.width * startVal), y: (config.height * 0.9) }); 
				
				//the sprite cannot leave the bounds of the scene
				scene.enemyGladiators[i].body.setCollideWorldBounds(true);
				
				//increment the index
				i++;
			  
			  }else if(j < scene.numArch){
				  
				var randInt = Math.random(); 
				var startVal;
				 
				if(randInt < 0.5)
				{
					startVal = 0;
				}
				else
				{
					startVal = 1;
				}
				  
				scene.enemyArchers[j] = new ArcherMPC({scene: scene, x: (config.width * startVal), y: (config.height * 0.9) }); 
				scene.enemyArchers[j].body.setCollideWorldBounds(true);
			  
				j++;
				
			  }else if(k < scene.numAxeMen){
				  
				var randInt = Math.random(); 
				var startVal;
				 
				if(randInt < 0.5)
				{
					startVal = 0;
				}
				else
				{
					startVal = 1;
				}
				  
				scene.enemyArchers[k] = new AxeThrowerMPC({scene: scene, x: (config.width * startVal), y: (config.height * 0.9) }); 
				scene.enemyArchers[k].body.setCollideWorldBounds(true);
			  
				k++;
				
			  }else{
				 
				//once the last enemy has been created, then the battle can start 
				scene.startBattle = true;
				
				clearInterval( scene.createCharacters );
				
			  }
			
			}
			  
		  }, 1000);
		  
		  /*
				this.boulder = new Boulder({scene: this, x: 500, y: 100, scale: config.height*0.00075, flipX: true });
		  
		  
		        this.graphics = this.add.graphics();
				//this.rectA = new Phaser.Geom.Rectangle(0, 0, this.enemyGladiator1.hitArea[2], this.enemyGladiator1.newSizeY);
				//this.rectB = new Phaser.Geom.Rectangle(0, 0, this.playerOne.newSizeX, this.playerOne.newSizeY);
				//this.rectC = new Phaser.Geom.Rectangle(0, 0, this.enemyGladiator1.hitArea[2], this.enemyGladiator1.newSizeY);
				this.rectD = new Phaser.Geom.Rectangle(0, 0, this.boulder.newSizeX, this.boulder.newSizeY);
				//this.rectE = new Phaser.Geom.Rectangle(0, 0, this.playerOne.hitArea[2], this.playerOne.newSizeY);
		
				//window.alert(this.boulder.size.x);
		*/
		
		//set all keyup events to play the "stop" animation for sprite
		 this.input.keyboard.on('keydown_F', function (event) {
		   
			window.alert(scene.numGlad + ", " + scene.numArch + ", " + scene.numAxeMen + ", " + k + ", " + j + ", " + i);			
		   
		});
		
		/*
		//set all keyup events to play the "stop" animation for sprite
		 this.input.keyboard.on('keydown_G', function (event) {
		   
		   scene.enemyNPCs.getChildren()[0].destroySelf();
		   
		});
		*/
		
		//set up the helper class so that the preUpdate methods in the helper class are run before the methods in the preupdate function for the archerMPC are run. 
		
  	
  }
		
  
  //play this page if the player looses
  PageLost(){
	  
	var scene =  this;
	
	clearInterval( scene.createCharacters );
	
	this.endPage = this.add.image(config.width/2, config.height/5, 'Villager').setScale(config.width / 1400); //set and scale the background pic
	this.endPage.setOrigin(0.5,0); //correctly set its origin
	
	//variables that hold the text strings
	var textEnd = "You have lost";
	var contText = "restart level";
	var backText = "back to menu";
	
	//create the text element for the villager text string 
	var fontEnd = config.width * 0.15 + "% Arial";
	var styleEnd = { font: fontEnd, fill: "Black", align: "center" };
	var text = this.add.text(config.width*.5, config.height*.35, textEnd, styleEnd);
	text.setOrigin(0.45);
	
	//create the text element for the continue string 
	var contFont = config.width * 0.15 + "% Arial";
	var styleCont = { font: fontEnd, fill: "Green", align: "center" };
	var cont = this.add.text(config.width*.45, config.height*.45, contText, styleCont);
	cont.setOrigin(0.45);
	
	cont.setInteractive(); //set it interactive 
	
	//create the text element for the back string
	var backFont = config.width * 0.15 + "% Arial";
	var styleBack = { font: fontEnd, fill: "Red", align: "center" };
	var back = this.add.text(config.width*.6, config.height*.45, backText, styleBack);
	back.setOrigin(0.45);
	
	back.setInteractive(); //set it interactive 
	
	//if the user clicks on it, start the Intro_Scene
	back.on('pointerdown', function(pointer){
		 
		 scene.scene.start("Intro_Scene");
		
	});
	
	//if the user clicks on it, restart the current scene
	cont.on('pointerdown', function(pointer){
		 
		  scene.scene.restart();
		
	});
	
	back.on('pointerover', function(pointer){
		 
		 $('body').css({
			 
			 'cursor': 'pointer'
			 
		 });
		
	});
	
	back.on('pointerout', function(pointer){
		 
		 $('body').css({
			 
			 'cursor': 'auto'
			 
		 });
		
	});
	
	cont.on('pointerover', function(pointer){
		 
		 $('body').css({
			 
			 'cursor': 'pointer'
			 
		 });
		
	});
	
	cont.on('pointerout', function(pointer){
		 
		 $('body').css({
			 
			 'cursor': 'auto'
			 
		 });
		
	});
	
}
  
  //play this function if the player wins
  PageWin(){
	
	var scene = this;
	
	this.endPage = this.add.image(config.width/2, config.height/5, 'Villager').setScale(config.width/1500); //set and scale the background pic
	this.endPage.setOrigin(0.5,0); //correctly set its origin
	
	//variables that hold the text strings
	var textEnd = "Good Job! You Have Complete This Wave";
	var contText = "continue";
	var backText = "back to menu";
	
	//create the text element for the villager text string 
	var fontEnd = config.width * 0.15 + "% Arial";
	var styleEnd = { font: fontEnd, fill: "Black", align: "center" };
	var text = this.add.text(config.width*.5, config.height*.35, textEnd, styleEnd);
	text.setOrigin(0.45);
	
	//create the text element for the continue string 
	var contFont = config.width * 0.15 + "% Arial";
	var styleCont = { font: fontEnd, fill: "Green", align: "center" };
	var cont = this.add.text(config.width*.45, config.height*.45, contText, styleCont);
	cont.setOrigin(0.45);
	
	cont.setInteractive(); //set it interactive
	
	//create the text element for the back string
	var backFont = config.width * 0.15 + "% Arial";
	var styleBack = { font: fontEnd, fill: "Red", align: "center" };
	var back = this.add.text(config.width*.6, config.height*.45, backText, styleBack);
	back.setOrigin(0.45);
	
	back.setInteractive(); //set it interactive
	
	//if the user clicks on it, start the Intro_Scene
	back.on('pointerdown', function(pointer){
		 
		 scene.scene.start("Intro_Scene");
		
	});
	
	//if the user clicks on it, start the next scene
	cont.on('pointerdown', function(pointer){
		 
		  scene.scene.start(scene.nextLevel);
		  
	});
	
	back.on('pointerover', function(pointer){
		 
		 $('body').css({
			 
			 'cursor': 'pointer'
			 
		 });
		
	});
	
	//set the pointer out event listeners
	back.on('pointerout', function(pointer){
		 
		 //reset the pointer 
		 $('body').css({
			 
			 'cursor': 'auto'
			 
		 });
		
	});
	
	cont.on('pointerover', function(pointer){
		 
		 $('body').css({
			 
			 'cursor': 'pointer'
			 
		 });
		
	});
	
	cont.on('pointerout', function(pointer){
		 
		 //reset the pointer 
		 $('body').css({
			 
			 'cursor': 'auto'
			 
		 });
		
	});
	
}
  
  //update the scene every second
  update(){	  
	  
	 for(var i = 0; i < this.goodArrow.getChildren().length; i++) {
		var arrow = this.goodArrow.getChildren()[i];
		arrow.update();
	 }
	 
	 for(var i = 0; i < this.badArrow.getChildren().length; i++) {
		var arrow = this.badArrow.getChildren()[i];
		arrow.update();
	 }
	 
/*
	 this.graphics.lineStyle(5, 0xFF00FF, 1.0);
	 this.graphics.fillStyle( 0xFF00FF, 0.5);
	 //this.graphics.fillRect(this.playerOne.body.x, this.playerOne.body.y , this.playerOne.newSizeX, this.playerOne.newSizeY);
	 
	 this.graphics.lineStyle(5, 0xFF00FF, 1.0);
	 this.graphics.fillStyle( 0xFF00FF, 0.5);
	// this.graphics.fillRect(this.enemyGladiator1.body.x - this.enemyGladiator1.hitArea[1], this.enemyGladiator1.body.y, this.enemyGladiator1.hitArea[2], this.enemyGladiator1.newSizeY);
	 

	this.graphics.clear();
	//this.rectA.setPosition(this.enemyGladiator1.body.x - this.enemyGladiator1.hitArea[1], this.enemyGladiator1.body.y);
	//this.rectA.setSize(this.enemyGladiator1.hitArea[2], this.enemyGladiator1.newSizeY * 0.5);

    //this.graphics.lineStyle(1, 0xbb4040);
    //this.graphics.strokeRectShape(this.rectA);
	
	
	//this.rectB.setPosition(this.playerOne.body.x, this.playerOne.body.y);
	//this.rectB.setSize(this.playerOne.newSizeX, this.playerOne.newSizeY * 0.5);
	
    //this.graphics.lineStyle(1,  0x6666ff);
    //this.graphics.strokeRectShape(this.rectB);
	
	
	//this.rectC.setPosition(this.enemyGladiator1.body.x + this.enemyGladiator1.hitArea[0], this.enemyGladiator1.body.y + this.enemyGladiator1.newSizeY * 0.5);
	//this.rectC.setSize( this.enemyGladiator1.hitArea[2], this.enemyGladiator1.newSizeY * 0.5);
	
    //this.graphics.lineStyle(1, 0x9966ff);
    //this.graphics.strokeRectShape(this.rectC);
	
	
	this.rectD.setPosition(this.boulder.body.x, this.boulder.body.y);
	this.rectD.setSize( this.boulder.newSizeY, this.boulder.newSizeY);
	
    this.graphics.lineStyle(1, 0x9966ff);
    this.graphics.strokeRectShape(this.rectD);
	
	
	//this.rectE.setPosition(this.playerOne.body.x - this.playerOne.hitArea[1], this.playerOne.body.y + this.playerOne.newSizeY * 0.5);
	//this.rectE.setSize(this.playerOne.hitArea[2], this.playerOne.newSizeY * 0.5);

    //this.graphics.lineStyle(1, 0xbb4040);
    //this.graphics.strokeRectShape(this.rectE);
	
  */
	
	if( this.enemyNPCs.getChildren().length == 0 && this.startBattle) {
		
		this.sceneEnd = true;
		
		if(this.displayEndScene){ //first time this variable is true
			
			this.PageWin(); //show the ending scene
			
			this.displayEndScene = false; //prevents ending scene from showing up multiple times
			
			this.playerOne.immunity = true; //prevent the sprite from dying 
		}
	}
	
	if( this.playerOne.isDead) {
		
		this.sceneEnd = true;
		this.playerOneIsDead = true;
		
		if(this.displayEndScene){ //first time this variable is true
			
			this.PageLost(); //show the ending scene
			
			this.displayEndScene = false; //prevents ending scene from showing up multiple times
		}
	}
 
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
  
  //runs when a powerup hits the player
  powerUp(sprite, powerUp){
	  
	  if(config.mainPlayer == "knight"){
		  
		powerUp.enactSuperHit(sprite);
	  
	  }else if(config.mainPlayer == "lumberjack"){
		  
		powerUp.enactSuperHit(sprite);
		
	  }else{
		  
		powerUp.enactSuperArrow(sprite);
		  
	  }
	  
  }
  
}




