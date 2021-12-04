
//lumberjack class that is very similar to the gladiator player class

class LumberJackPlayer extends WarriorPlayer{
	
	constructor(config){
		super(config); //variables for the gladiator
		
		var LumberJack = this; //use this variable to extend the scope of the class
		this.scene = config.scene; //use variable to create local scope of config.scene
		
		config.scene.mainPlayers.add(this); //add the sprite to the group of mainPlayers 
		
		this.targets = [config.scene.enemyNPCs]; //set archers as one of the targets of the sprites
		this.move("s"); //set the first frame of the sprite
		
		this.health = 30; //adjust the health 
		this.speed = this.speed / 1.25; //adjust the speed
		
		this.attackStrength = 6; //declare attack strength
		this.superAttackStrength = 4;
		this.jumpStrength = this.jumpStrength / 1.4;
		
		this.registerHitSpeed = 50;
		//this.anchorOffset = 0.1;
		
		this.rescale = this.scene.config.height*0.00076; //set rescale value for the gladiator
		this.newSizeY = this.rescale*100;
		this.newSizeX = this.rescale*70;
		
		//adjust the small details of sprite	
		this.body.setSize(70, 100, true); //adjust the size of the hitbox
		this.body.setOffset(16,0); //adjust the position of the hitbox
		
		//this.targets = [config.scene.enemyNPCs];
		
		this.setScale(this.rescale); //set the scale of the sprite
		
		this.hitArea = [this.newSizeX*.6, this.newSizeX*.5, this.newSizeX*.8]; //set the boundaries for the hit radius of the gladiator
		this.permanentHitArea = [this.hitArea[0], this.hitArea[1], this.hitArea[2] ]; //permanent hit area of the sprite
		this.superHitArea = [-this.newSizeX*3, this.newSizeX*3, this.newSizeX*6.5]; //set the larger boundaries for the super hit
		
		//3, 3, 6.5 for superHit Area
		
		this.health_bar = new HealthBar({scene: config.scene, x: (this.body.x), y: (this.body.y), sprite: this}); //set up the health bar for the sprite
	
	}	
	
	move(dir){ //allows the sprite to move (r=right, l=left, s=stop, j=jump, h=hit, hr=hit+right hl=hit+left, jh=jump attack)
		
		if(dir == "r"){ 
			
			this.body.velocity.x = this.speed;
		    this.anims.play('lumberjack_forward', true);
			this.flipX = true;
			
		}else if(dir == "l"){
			
			this.body.velocity.x = -this.speed;
		    this.anims.play('lumberjack_forward', true);
			this.flipX = false;
			
		}else if(dir == "s"){
			
			this.body.velocity.x = 0;
		    this.anims.play('lumberjack_stop', true);
			
		}else if(dir == "j"){
			
			this.body.velocity.y = this.jumpStrength;
			
		}else if(dir == "sh"){
			
			this.body.velocity.x = 0;
		    this.anims.play('lumberjack_shield', true);
			
		}
	
			
		if(dir == "h"){
			
			this.body.velocity.x = 0;
			this.anims.play('lumberjack_attack', true);
			
		}else if(dir == "hs"){
			
			this.body.velocity.x = 0;
			this.anims.play('lumberjack_hit_short', true);
			
		}else if(dir == "hl"){
			
			this.body.velocity.x = -this.speed*.75;
			this.anims.play('lumberjack_attack_forward', true);
			
		}else if(dir == "hr"){
			
			this.body.velocity.x = this.speed*.75;
			this.anims.play('lumberjack_attack_forward', true);
			
		}else if(dir == "jh"){
			
			this.body.velocity.x = 0;
			this.anims.play('lumberjack_jump_attack', true);
			this.body.setGravityY(1000);
			this.body.bounce.set(0.0);
			this.holdJumpHit = true;
			
		}
		
	};
}