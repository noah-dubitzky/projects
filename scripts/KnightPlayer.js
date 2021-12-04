

//

class KnightPlayer extends WarriorPlayer{
	
	constructor(config){
		super(config); //variables for the gladiator
		
		var LumberJack = this; //use this variable to extend the scope of the class
		this.scene = config.scene; //use variable to create local scope of config.scene
		
		config.scene.mainPlayers.add(this); //add the sprite to the group of mainPlayers 
		
		this.targets = [config.scene.enemyNPCs]; //set archers as one of the targets of the sprites
		this.move("s"); //set the first frame of the sprite
		
		this.health = 25; //adjust the health 
		this.speed = this.speed / 1.1; //adjust the speed
		this.attackStrength = 5; //declare attack strength
		this.superAttackStrength = 6;
		this.jumpStrength = this.jumpStrength / 1.06;
		
		this.superHit = true;
		this.registerHitSpeed = 20;
		
		this.anchorOffset = 0.075;
		
		this.rescale = this.scene.config.height*0.00076; //set rescale value for the gladiator
		this.newSizeY = this.rescale*112;
		this.newSizeX = this.rescale*70;
		
		//window.alert(this.rescale);
		
		//adjust the small details of sprite	
		this.body.setSize(70, 112, true); //adjust the size of the hitbox
		this.body.setOffset(16,0); //adjust the position of the hitbox
		
		//this.targets = [config.scene.enemyNPCs];
		
		this.setScale(this.rescale); //set the scale of the sprite
		
		this.hitArea = [this.newSizeX*.6, this.newSizeX*.4, this.newSizeX*.8]; //set the boundaries for the hit radius of the gladiator
		this.permanentHitArea = [this.hitArea[0], this.hitArea[1], this.hitArea[2] ]; //permanent hit area of the sprite
		this.superHitArea = [-this.newSizeX*1.5, this.newSizeX*1.5, this.newSizeX*4]; //set the larger boundaries for the super hit
		
		this.health_bar = new HealthBar({scene: config.scene, x: (this.body.x), y: (this.body.y), sprite: this}); //set up the health bar for the sprite
	
	}	
	
	move(dir){ //allows the sprite to move (r=right, l=left, s=stop, j=jump, h=hit, hr=hit+right hl=hit+left, jh=jump attack)
		
		if(dir == "r"){ 
			
			this.body.velocity.x = this.speed;
		    this.anims.play('knight_forward', true);
			this.flipX = true;
			
		}else if(dir == "l"){
			
			this.body.velocity.x = -this.speed;
		    this.anims.play('knight_forward', true);
			this.flipX = false;
			
		}else if(dir == "s"){
			
			this.body.velocity.x = 0;
		    this.anims.play('knight_stop', true);
			
		}else if(dir == "j"){
			
			this.body.velocity.y = this.jumpStrength;
			
		}else if(dir == "sh"){
			
			this.body.velocity.x = 0;
		    this.anims.play('knight_shield', true);
			
		}
	
			
		if(dir == "h"){
			
			this.body.velocity.x = 0;
			this.anims.play('knight_attack', true);
			
		}else if(dir == "hs"){
			
			this.body.velocity.x = 0;
			this.anims.play('lumberjack_hit_short', true);
			
		}else if(dir == "hl"){
			
			this.body.velocity.x = -this.speed*.75;
			this.anims.play('knight_attack_forward', true);
			
		}else if(dir == "hr"){
			
			this.body.velocity.x = this.speed*.75;
			this.anims.play('knight_attack_forward', true);
			
		}else if(dir == "jh"){
			
			this.body.velocity.x = 0;
			this.anims.play('knight_jump_attack', true);
			this.body.setGravityY(1000);
			this.body.bounce.set(0.0);
			this.holdJumpHit = true;
			
		}
		
	};
}