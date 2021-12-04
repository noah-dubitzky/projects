class Intro_Scene extends Phaser.Scene {
  constructor() {
    super("Intro_Scene");
  }
  
  preload(){
	
  }

  create() {
	
	//create global variables 
	var scene;
	scene = this.scene; 
	
	//create the background imagery
	this.background = this.add.image(0, config.height, 'background').setScale(config.width/425); //set and scale the background pic
	this.background.setOrigin(0.08,1); //correctly set its origin
	
	//create the text for the title
	var fontTop = config.width * 0.35 + "% Arial";
	var styleTop = { font: fontTop, fill: "Red", align: "center" };
	var textTop = this.add.text(config.width*.5, config.height*.2, "Pixel battle", styleTop);
	textTop.setOrigin(0.5);
	
	//create the text "choose your character"
	var fontBottom = config.width * 0.2 + "% Arial";
	var styleBottom = { font: fontBottom, fill: "White", align: "center" };
	var textBottom = this.add.text(config.width*.5, config.height*.75, "Choose Your Character", styleBottom);
	textBottom.setOrigin(0.5);
	
	//create the sprite "LumberJack" with no gravity or physics
	var lumberjack = this.add.sprite(config.width*.35,config.height*.5,"lumberjack").setOrigin(0.3,0.5);
	lumberjack.x = config.width*.35;
	lumberjack.setScale(config.width*.001);
	lumberjack.anims.play('lumberjack_stop', true);
	
	//allow the user to click the sprite
	lumberjack.setInteractive();
	
	//if the cursor is over the sprite, then the sprite moves 
	lumberjack.on('pointerover', function(pointer){
		
		 lumberjack.anims.play('lumberjack_forward', true);
		 
		 $('body').css({
			 
			 'cursor': 'pointer'
			 
		 });
		
	});
	
	//reset the sprite afterwards
	lumberjack.on('pointerout', function(pointer){
		
		lumberjack.anims.play('lumberjack_stop', true);
		
		$('body').css({
			 
			 'cursor': 'auto'
			 
		 });
		
	});
	
	//once the user clicks the sprite, go the next scene
	lumberjack.on('pointerdown', function(pointer){
	
		config.mainPlayer = "lumberjack";
		scene.start("Intro_Scene_2"); /////////////////////////////////////////////////////////////////////////////////////////////
		
	});
	
	
	//same for archer sprite
	var archer = this.add.sprite(config.width*.5,config.height*.5,"archer").setOrigin(0.7,0.5);
	archer.x = config.width*.5;
	archer.setScale(config.width*.0009);
	archer.anims.play('archer_stop', true);

	archer.setInteractive();
	
	archer.on('pointerover', function(pointer){
		
		 archer.anims.play('archer_forward', true);
		 
		 $('body').css({
			 
			 'cursor': 'pointer'
			 
		 });
		
	});
	
	archer.on('pointerout', function(pointer){
		
		archer.anims.play('archer_stop', true);
		
		$('body').css({
			 
			 'cursor': 'auto'
			 
		 });
		
	});
	
	archer.on('pointerdown', function(pointer){
		
		config.mainPlayer = "archer";
		scene.start("Intro_Scene_2");
		
	});
	
	
	//same code for knight
	var knight = this.add.sprite(config.width*.5,config.height*.5,"archer").setOrigin(0.7,0.5);
	knight.x = config.width*.62;
	knight.setScale(config.width*.001);
	knight.anims.play('knight_stop', true);

	knight.setInteractive();
	
	knight.on('pointerover', function(pointer){
		
		 knight.anims.play('knight_forward', true);
		 
		 $('body').css({
			 
			 'cursor': 'pointer'
			 
		 });
		
	});
	
	knight.on('pointerout', function(pointer){
		
		knight.anims.play('knight_stop', true);
		
		$('body').css({
			 
			 'cursor': 'auto'
			 
		 });
		
	});
	
	knight.on('pointerdown', function(pointer){
		
		config.mainPlayer = "knight";
		scene.start("Intro_Scene_2");
		
	});
	
	
  };

  update(){
	 
	  
  };

}







