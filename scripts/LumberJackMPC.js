//lumberjack MPC class that is very similar to the gladiator MPC class

class LumberJackMPC extends WarriorMPC{
	
	constructor(config){
		super(config); //variables for the gladiator
		
		var LumberJack = this; //use this variable to extend the scope of the class
		this.scene = config.scene; //use variable to create local scope of config.scene
		
		this.targets; //set archers as one of the targets of the sprites
		this.move("s"); //set the first frame of the sprite
		
		this.rescale = this.scene.config.height*0.00076; //set rescale value for the gladiator
		this.newSizeY = this.rescale*100;
		this.newSizeX = this.rescale*70;
		
		//adjust the small details of sprite	
		this.body.setSize(70, 100, true); //adjust the size of the hitbox
		this.body.setOffset(16,0); //adjust the position of the hitbox
		
		this.setScale(this.rescale); //set the scale of the sprite
		
		this.hitArea = [this.newSizeX*.8, this.newSizeX*.15, this.newSizeX*.45]; //set the boundaries for the hit radius of the gladiator
		
		var randInt = Math.floor(Math.random() * 10) * .02; 
		this.hitMargin = randInt * this.newSizeX;  //use this variable to ensure that not every gladiatorMPC attacks at the same spot,vatiable used in preUpdate method
		//we do this by slights shrinking the size of the hitbox
		this.hitArea[0] = this.hitArea[0] - this.hitMargin; //use variable to change the size of the hitbox
		this.hitArea[1] = this.hitArea[1] - this.hitMargin; //use variable to change the size of the hitbox
		
		this.permanentHitArea = [this.hitArea[0], this.hitArea[1], this.hitArea[2] ]; //permanent hit area of the sprite
		
		this.health = 20; //set health to 3
		this.speed =  randInt*(this.speed / 2) + (this.speed / 2); //set random speed 
		this.jumpStrength = this.jumpStrength / 1.33;
		this.attackStrength = 3; //declare attack strength
		this.superAttackStrength = 5;
		
		//config.scene.lumberJackMPCs.add(this); //add the gladiator to the "gladiatorMPCs" group
		
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