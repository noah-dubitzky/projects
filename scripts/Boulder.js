

class Boulder extends Phaser.GameObjects.Sprite { //extend from the sprite class
    constructor(config) {
        super(config.scene, config.x, config.y, "boulder"); //variables for the gladiator
		
		var boulder = this;

		this.velocity = config.parent.velocity; //the velocity and trajectory of the arrow
		this.traj = config.parent.traj;
		
		this.knockBack = config.parent.knockBack;
		
		this.scene = config.scene;
		
		this.damage = config.parent.damage;
		
		config.scene.add.existing(this); //add the sprite to the scene
		config.scene.physics.world.enableBody(this); //give it physics
		
		this.canAttack = true;
		
		this.rescale = config.rescale * 0.5; //set rescale value for the golem
		this.newSizeY = this.rescale*120;
		this.newSizeX = this.rescale*120;
		
		this.body.setSize(120, 120, true); //adjust the size of the hitbox
		this.body.setOffset(40, 80);
		
		this.setScale(this.rescale); //use the config variable from the scene 
		
		this.targets = config.targets;
		
		this.hitRadius = this.newSizeX * 0.75;
		
		config.scene.boulders.add(this); //add the boulder to the "boulders" group
		
		/*
		if(config.team == "good"){
			
			config.scene.goodArrow.add(this);
			
		}else{
			
			config.scene.badArrow.add(this);
			
		}
		*/
		
		if(config.flipX){
		    this.body.velocity.x = this.velocity;  
            this.body.velocity.y = this.traj;  			
		    this.anims.play('boulder_forward', true);
			this.flipX = config.flipX;
		}else{
			this.body.velocity.x = -1*this.velocity;  
            this.body.velocity.y = this.traj;  			
		    this.anims.play('boulder_forward', true);
			this.flipX = config.flipX;
		}
		
		/* this is the code that shows the hitbox of the sprite
		this.scene.graphics = this.scene.add.graphics();
		
		var sprite = this;
		
		this.scene.rectD = new Phaser.Geom.Rectangle(sprite.body.x - sprite.hitRadius, sprite.body.y - sprite.hitRadius, sprite.newSizeX + sprite.hitRadius * 2, sprite.newSizeY + sprite.hitRadius);
		*/
		
	}
	
	destroySelf(){
		
		if(this.canAttack == true ){
			
			this.registerHit(this, this.damage, this.knockBack);
			
			this.canAttack = false;
		
		}
		
		var config = this;
		
		var set = setTimeout(function(){ //destroy the sprite in 300 ms
			
			config.destroy(); //destroy the sprite
				
		}, 900);
		
		this.body.velocity.x = 0;  
        this.body.velocity.y = 0;  			
		this.anims.play('boulder_explode', true);
		
	}
	
	registerHit(sprite , hitStrength, knockBack){ //tells the gladiator to look for a target and register a hit 

		//is mostly identical to the registerHit function for the Warrior.js class
	  for(var j = 0; j < sprite.targets.length; j++){
		
		for(var i = 0; i < sprite.targets[j].getChildren().length; i++) {
			var enemy = sprite.targets[j].getChildren()[i];
			
			if(sprite.flipX){
				
				var gladiatorRect = new Phaser.Geom.Rectangle(sprite.body.x - sprite.hitRadius, sprite.body.y - sprite.hitRadius, sprite.newSizeX + sprite.hitRadius * 2, sprite.newSizeY + sprite.hitRadius);
				var targetRect = new Phaser.Geom.Rectangle(enemy.body.x, enemy.body.y , enemy.newSizeX, enemy.newSizeY);
				
				//only difference from Warrior.js class function is this one does not require the space key to be down
				if (Phaser.Geom.Intersects.RectangleToRectangle(gladiatorRect, targetRect) && (!sprite.getHitLeft && !sprite.getHitRight)){
					
					
					if( (sprite.body.x + sprite.newSizeX*0.5) > (enemy.body.x + enemy.newSizeX*.5) ){
						enemy.getsHit("r", hitStrength, knockBack); //register a hit left for the archer
						
						//window.alert(config.hitArea[2]);
					}else{
						enemy.getsHit("l", hitStrength, knockBack); //register a hit left for the archerd
					}
					
				}
			}else{
				
				var gladiatorRect1 = new Phaser.Geom.Rectangle(sprite.body.x - sprite.hitRadius, sprite.body.y - sprite.hitRadius, sprite.newSizeX + sprite.hitRadius * 2, sprite.newSizeY + sprite.hitRadius );
				var targetRect1 = new Phaser.Geom.Rectangle(enemy.body.x, enemy.body.y, enemy.newSizeX, enemy.newSizeY);
				
				if ( Phaser.Geom.Intersects.RectangleToRectangle(gladiatorRect1, targetRect1) && (!sprite.getHitLeft && !sprite.getHitRight)){
					
					
					if( (sprite.body.x + sprite.newSizeX*0.5) < (enemy.body.x + enemy.newSizeX*.5) ){
						
						enemy.getsHit("l", hitStrength, knockBack); //register a hit left for the archer
							
					}else{
						
						enemy.getsHit("r", hitStrength, knockBack); //register a hit left for the archer
						
						//window.alert(config.hitArea[2] + ", " + config.hitArea[1] + " ," + config.newSizeX);
						
					}
					
				}
			}
			
		}
      }
		
	};
	
	//the boulder is destroyed as it leaves the scene
	
	preUpdate(time, delta){
		
		super.preUpdate(time, delta); //init update function
		
		
		/* this code draw the hitbox on the canvas
		this.scene.graphics.clear();
		
		var sprite = this;
		
		this.scene.rectD.setPosition(sprite.body.x - sprite.hitRadius, sprite.body.y - sprite.hitRadius);
		this.scene.rectD.setSize( sprite.newSizeX + sprite.hitRadius * 2, sprite.newSizeY + sprite.hitRadius);
	
		this.scene.graphics.lineStyle(1, 0x9966ff);
		this.scene.graphics.strokeRectShape(this.scene.rectD);
		*/
		
		if(this.body.y > this.scene.config.height){
			
			this.destroy();
			
		}
		
		
	};
	
  
}