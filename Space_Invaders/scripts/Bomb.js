class Bomb extends Phaser.GameObjects.Sprite { //extend from the sprite class
    constructor(config) {
        super(config.scene, config.x, config.y, "bomb"); //variables for the gladiator
		
		config.scene.lasers.add(this); //add the sprite the main Players group
		
		config.scene.add.existing(this); //add the sprite to the scene
		config.scene.physics.world.enableBody(this); //give it physics
		
		this.body.allowGravity = false;
		this.body.immovable = true;
		
		this.rescale = config.scene.scale; //set the scale of the sprite based off the size of the window
		this.newSizeY = this.rescale*112;
		this.newSizeX = this.rescale*112;
		this.body.setSize(112, 112, true); //adjust the size of the hitbox
		this.body.setOffset(0,0); //adjust the position of the hitbox
		
		this.setOrigin(0.5, 0.5);
		
		this.setScale(this.rescale);
		
		this.targets = [config.scene.enemies, config.scene.missles];
		
		this.configScale = config.scene.width;
		
		this.speed = (this.configScale / 1.5);
		
		this.move("s");
		
		this.angle = 180;
		
	}
	
	preUpdate(time, delta){
		
		super.preUpdate(time, delta); //init update function
		
		if(this.body.y > this.scene.height || this.body.y < -100)
		{
			this.destroy();
			
		}
		
	}
	
	move(dir){ //allows the sprite to move (r=right, l=left, s=stop, j=jump, lo=load, f=fire)
		
		if(dir == "s"){ 
			
		    this.body.velocity.y = -this.speed;
		    this.anims.play('Missle_Move', true);
			
		}
		
	};
	
	Explode(sprite){
		
		var selectedKills = [];
		var index = 0;
		
		for(var j = 0; j < sprite.targets.length; j++){
		
			for(var i = 0; i < sprite.targets[j].getChildren().length; i++) {
				
				var enemy = sprite.targets[j].getChildren()[i];
				
				var gladiatorRect = new Phaser.Geom.Rectangle(sprite.x - sprite.newSizeX * 8, sprite.y - sprite.newSizeY * 8, sprite.newSizeX * 16, sprite.newSizeY * 16);
				var targetRect = new Phaser.Geom.Rectangle(enemy.body.x, enemy.body.y , enemy.newSizeX, enemy.newSizeY);
				
				//only difference from Warrior.js class function is this one does not require the space key to be down
				if (Phaser.Geom.Intersects.RectangleToRectangle(gladiatorRect, targetRect) ){
					
					selectedKills[index] = i;
					index++;
					
				}
		  }
		  
		  
		  for(var i = index - 1; i >= 0; i--)
		  {
			var enemy = sprite.targets[j].getChildren()[ selectedKills[i] ];
			enemy.Explode(enemy);
		  }
		  
		  selectedKills = [];
		  index = 0;
		}
		
	
		var explosion = new Explosion(sprite.scene, sprite.x, sprite.y, 5 );
		sprite.destroy();
		
	}
	
  
}