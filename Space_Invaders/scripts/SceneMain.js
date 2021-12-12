//increase registerHitSpeed and play animation faster to accomodate for spam clicking 
//allow archer player to fire while running 
class SceneMain extends Phaser.Scene {
  constructor(key) { 
    super(key);
	
	 this.enemy1Spawn = [];
	 this.enemy2Spawn = [];
	 this.enemy3Spawn = [];
	 this.missileSpawn = [];
	 this.homingSpawn = [];
	 this.ammoSpawn = [];
	  
	 this.characters = [
							this.enemy1Spawn, 
					        this.enemy2Spawn, 
						    this.enemy3Spawn, 
						    this.missileSpawn, 
						    this.homingSpawn, 
						    this.ammoSpawn ];
	
  }
  
  create(){
	  
	  this.graphics = this.add.graphics();
	  
	  this.physics.world.setBounds(0,h*0.10,w,h*0.9);
	 
	  this.height = config.height;
	 
	  this.width = config.width; //so that the scale of the sprites is based on the height and not the width
	  
	  this.scale = this.width / 2000;
	  
	  var scene = this;
	  
	  this.enactRespawn = false;
	  this.endScene = false;
	  this.score = 0;
	  this.bombNum = 10;
	  
	  this.pause = false;
	  
	  
	  //first is the interval variable, then the boolean for spawning, then the spawn rate
	  this.enemy1Spawn = [1, true, 2700];
	  this.enemy2Spawn = [1, true, 2500];
	  this.enemy3Spawn = [1, true, 3200];
	  this.missileSpawn = [1, true, 2000];
	  this.homingSpawn = [1, true, 3000];
	  this.ammoSpawn = [1, true, 10000];
	  
	  this.background = this.add.tileSprite(0, 0, this.height, this.width, "Space1").setOrigin(0,0).setScale(1);
	  
	  
	  $(window).blur(function() {
		   
		scene.pause = true;
		   
		 scene.scene.pause();
		   
      });
	   
	  $(window).focus(function() {
		   
		  scene.pause = false;
		   
		  scene.scene.resume();
		  
		  //window.alert("yams1");
		   
       });
	   
	   
	    this.ammoCount = this.add.sprite(this.width/1.8, this.height * 0.009).setOrigin(0,0).setScale(this.scale * 0.7).setDepth(4);
		this.ammoCount.anims.play("Ammo_Count", true);
		
		this.ammoDecrem = true;
		
		this.laser = this.add.image(this.width/1.9, this.height * 0.014, "Laser_Pic").setOrigin(0,0).setScale(this.scale * 2.5).setDepth(4);

	  
	  //this.background = this.add.tileSprite(0, 0, this.height, this.width, "Space").setOrigin(0,0);
	 
	  var r2 = this.add.rectangle(0, 0, w, h*0.08, 0x00509B);
	  
	  r2.setOrigin(0,0);

      r2.setStrokeStyle(4, 0x00609B);
	  
	  r2.setDepth(2);
	  
	  this.lasers = this.physics.add.group();
	  this.enemies = this.physics.add.group();
	  this.missles = this.physics.add.group();
	  this.mainShip = this.physics.add.group();
	  this.evilLaser = this.physics.add.group();
	  this.PowerUps = this.physics.add.group();
	  this.Characters = this.physics.add.group();
	  
	  this.enemy = [];
	  
	  this.ship = new Ship({scene: this, x: this.width / 2, y: this.height * 0.95, side: "left" });
	 
	  this.health = [];
	  
	  for(var i = 0; i < this.ship.lives; i++)
	  {
		 this.health[i] = this.add.image(i * 135 * this.scale, 0, "SpaceShipPic").setOrigin(0,0).setScale(this.scale).setDepth(3);
	  
	  }
	  
	  var text = "score: 0";
	
		//create the text element for the scene
	  var fontMain = this.width * 0.3 + "% Comic Sans"; 
	  var styleMain = { font: fontMain, fill: "Black", align: "center" };
      this.textMain = this.add.text(this.width * 0.7, this.height * 0.015, text, styleMain);
	  this.textMain.setOrigin(0,0).setDepth(3);
	  this.textMain.setText("score: 0");
		
	  this.bomb = this.add.image(this.width/2.5, this.height * 0.009, "Missle_Pic").setOrigin(0,0).setScale(this.scale).setDepth(3);
	  this.bombText = this.add.text(this.width / 2.3, this.height * 0.012, text, styleMain);
	  this.bombText.setOrigin(0,0).setDepth(3);
	  this.bombText.setText("X 10");
		
	  this.physics.add.collider(this.PowerUps, this.mainShip, function(boost, ship){
			
			boost.PowerUp(ship);
			
	  });  //create collider between archer and platforms
		
	  this.physics.add.collider(this.evilLaser, this.mainShip, function(laser, ship){
			
			laser.Explode(laser);
			ship.getsHit(ship, scene, laser.damage);
			
	  });  //create collider between archer and platforms
	  
	  this.physics.add.collider(this.lasers, this.enemies, function(laser, enemy){
			
			enemy.getsHit(scene, enemy, laser.damage); //runs hitground functions
			
			scene.incrementScore(10);
			
			laser.Explode(laser);
			
		});  //create collider between archer and platforms
		
	  this.physics.add.collider(this.lasers, this.missles, function(laser, enemy){
			
			enemy.Explode(enemy); //runs hitground functions
			
			scene.incrementScore(15);
			
			laser.Explode(laser);
			
	  });  //create collider between archer and platforms
		
	  this.physics.add.collider(this.mainShip, this.missles, function(ship, missle){
			
			missle.Explode(missle);
			
			scene.incrementScore(-1);
			
			ship.getsHit(ship, scene, missle.damage);
			
	  }); 
	  
	  this.physics.add.overlap(this.mainShip, this.enemies, function(ship, enemy){
			
			enemy.Explode(enemy);
			
			scene.incrementScore(-2);
			
			ship.getsHit(ship, scene, 5);
			
	  }); 
	  
	 this.SpawnElements();
	  
	 
	  /*this is the code used to create boxes
	  var sprite = scene.ship.bomb;
	  
	   scene.rect = new Phaser.Geom.Rectangle(sprite.x - sprite.newSizeX * 4, sprite.y - sprite.newSizeY * 4, sprite.newSizeX * 8, sprite.newSizeY * 8);
	   //scene.rect2 = new Phaser.Geom.Rectangle(0, 0, scene.missle.newSizeX, scene.missle.newSizeY);
	  
	  
	 // scene.rect = new Phaser.Geom.Rectangle(0,0,100,100);
	  
	  this.graphics.lineStyle(1, 0xFF00FF, 1.0);
	  this.graphics.fillStyle( 0xFF00FF, 0.2);
	
      this.graphics.strokeRectShape(this.rect);
	  */
	  
  }
  
  //create the intervals that spawn the enemies of the scene
  SpawnElements(){
	  
	var scene = this;
	
	for(var i = 0; i < this.characters.length - 1; i++)
	{
		
		clearInterval(this.characters[i][0]);
		
	}
  
	this.enemy1Spawn[0] = setInterval(function(){
		   
		   if(!scene.pause && scene.enemy1Spawn[1])
		   {
		  
				var position = Math.random()*0.8 + 0.05;
				scene.enemy[i] = new Enemy_1({scene: scene, x: (config.width * position), y: 0, side: "left" });
			   
		   }
		  
	 }, scene.enemy1Spawn[2]);
	 
	this.enemy2Spawn[0] = setInterval(function(){
		   
		   if(!scene.pause && scene.enemy2Spawn[1])
		   {
		  
				var position = Math.random()*0.8 + 0.05;
				scene.enemy[i] = new Enemy_2({scene: scene, x: (config.width * position), y: 0, side: "left" });
			   
		   }
		  
	}, scene.enemy2Spawn[2]);
	 
	this.enemy3Spawn[0] = setInterval(function(){
		   
		   if(!scene.pause && scene.enemy3Spawn[1])
		   {
		  
				var position = Math.random()*0.8 + 0.05;
				scene.enemy[i] = new Enemy_3({scene: scene, x: (config.width * position), y: 0, side: "left" });
			   
		   }
		  
	 }, scene.enemy3Spawn[2]);
	 
	this.missileSpawn[0] = setInterval(function(){
		   
		   if(!scene.pause && scene.missileSpawn[1])
		   {
		  
				var position = Math.random()*0.8 + 0.05;
				scene.missle = new Missle({scene: scene, x: (config.width * position), y: 0});
			   
		   }
		  
	}, scene.missileSpawn[2]);
	 
	this.homingSpawn[0] = setInterval(function(){
		   
		   if(!scene.pause && scene.homingSpawn[1])
		   {
		  
				var position = Math.random()*0.8 + 0.05;
				scene.missle = new HomingMissile({scene: scene, x: (config.width * position), y: 0});
				
				//window.alert("yams");
			   
		   }
		  
	 }, scene.homingSpawn[2]);
	 
	this.ammoSpawn[0] = setInterval(function(){
		   
		   if(!scene.pause && scene.ammoSpawn[1])
		   {
		  
				var positionX = Math.random()*0.8 + 0.05;
				var positionY = Math.random()*0.1 + 0.5;
				scene.powerUp = new AmmoReload({scene: scene, x: (config.width * positionX), y: (config.height * positionY), side: "left" });
					
		   }
		  
	}, 10000);
	 
  }
	 
  
  update(){
	  
	  
	  if( this.ship.ammoCount > 400 )
	  {
		 this.ammoCount.anims.pause(this.ammoCount.anims.currentAnim.frames[0]);
		  
	  }else if( Math.ceil( this.ship.ammoCount / (this.ship.ammoOriginal/5) ) == 5 )
	  {
		 this.ammoCount.anims.pause(this.ammoCount.anims.currentAnim.frames[0]);
		  
	  }else if( Math.ceil( this.ship.ammoCount / (this.ship.ammoOriginal/5) ) == 4 )
	  {
		 this.ammoCount.anims.pause(this.ammoCount.anims.currentAnim.frames[1]);
		  
	  }else if( Math.ceil( this.ship.ammoCount / (this.ship.ammoOriginal/5) ) == 3 )
	  {
		 this.ammoCount.anims.pause(this.ammoCount.anims.currentAnim.frames[2]);
		  
	  }else if( Math.ceil( this.ship.ammoCount / (this.ship.ammoOriginal/5) ) == 2 )
	  {
		  this.ammoCount.anims.pause(this.ammoCount.anims.currentAnim.frames[3]);
		  
	  }else if( Math.ceil( this.ship.ammoCount / (this.ship.ammoOriginal/5) ) == 1 )
	  {
		  this.ammoCount.anims.pause(this.ammoCount.anims.currentAnim.frames[4]);
		   
	  }else if(this.ship.ammoCount == 0)
	  {
		 this.ammoCount.anims.pause(this.ammoCount.anims.currentAnim.frames[5]);
	  }
	  
	  if(this.ship.isDead)
	  {
		  
		this.health[this.ship.lives].alpha = 0;
	  
	  }

/*
	if(this.ship.health < 0 && !this.enactRespawn)
	{
	
	  if(this.ship.lives > 0){
		  
		this.ship.Explode(this.ship, this);
		
		this.enactRespawn = true;
		
		this.health[this.ship.lives].alpha = 0;
	  }
	  else if(!this.endScene)
	  {
		  this.ship.DestroySelf(this.ship, this);
		  window.alert("game over");
		  this.endScene = true;
	  }
	
	}
    */
	this.background.tilePositionY -= 2;
	
	/*
	this.graphics.clear();
	  
	this.graphics.lineStyle(1, 0xFF00FF, 1.0);
	this.graphics.fillStyle( 0xFF00FF, 0.2);
	 
	this.rect.setPosition(this.ship.body.x, this.ship.body.y);
	this.rect.setSize(this.ship.newSizeX, this.ship.newSizeY);
	
	//this.rect2.setPosition(this.missle.body.x, this.missle.body.y);
	//this.rect2.setSize(this.missle.newSizeX, this.missle.newSizeY);
	
    this.graphics.strokeRectShape(this.rect);
	//this.graphics.strokeRectShape(this.rect2);
	*/
  
  }
  
  incrementScore(x)
  {
	  this.score+=x;
	  this.textMain.setText("score: " + this.score);
  }
  
  decrementBombNum()
  {
	  this.bombNum--;
	  this.bombText.setText("X " + this.bombNum);
  }
  
  decrementAmmo(){
	  
	  if(this.ammoDecrem)
	  {
		this.ammoCount.anims.nextFrame();
		this.ammoCount.anims.pause();
		
		//this.ammoDecrem = false;
	  }
	  
  }
  
}




