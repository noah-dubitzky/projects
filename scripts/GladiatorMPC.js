//this is a gladiator sprite that is controled by the computer

class GladiatorMPC extends WarriorMPC { //extend from the sprite class
    constructor(config) {
        super(config); //variables for the gladiator
		
		this.name = "glad";
		
		var gladiator = this; //use this variable to extend the scope of the class
		this.scene = config.scene; //use variable to create local scope of config.scene
		
		this.attackStrength = 2; //declare attack strength
		this.superAttackStrength = 4;
		
		this.registerHitSpeed = 75;
		
		this.rescale = this.scene.config.height*0.00075; //set rescale value for the gladiator
		this.newSizeY = this.rescale*100;
		this.newSizeX = this.rescale*72;
		
		this.body.setSize(72, 100, true); //adjust the size of the hitbox
		this.body.setOffset(14,0);
		
		this.setScale(this.rescale); //use the config variable from the scene 
		
		this.hitArea = [this.newSizeX*.8, this.newSizeX*.15, this.newSizeX*.45]; //set the boundaries for the hit radius of the gladiator 

		this.targets = [config.scene.mainPlayers];
		this.selectedTarget = this.targets[0].getChildren()[0];

	    var randInt = Math.floor(Math.random() * 10) * .02; 
		this.hitMargin = randInt * this.newSizeX;  
		
		//use this variable to ensure that not every gladiatorMPC attacks at the same spot,vatiable used in preUpdate method
		//we do this by slights shrinking the size of the hitbox
		this.hitArea[0] = this.hitArea[0] + this.hitMargin; //use variable to change the size of the hitbox
		this.hitArea[1] = this.hitArea[1] - this.hitMargin; //use variable to change the size of the hitbox
		
		this.permanentHitArea = [this.hitArea[0], this.hitArea[1], this.hitArea[2] ]; //store these numbers so they can be reset when changed
		
		this.health = 15; //set health to 3
		this.speed =  randInt*(this.speed / 1.6) + (this.speed / 1.6); //set random speed 
		this.jumpStrength = this.jumpStrength / 1.15;
		
		config.scene.enemyNPCs.add(this); //add the sprite to the enemyNPCs group
		
		this.health_bar = new HealthBar({scene: config.scene, x: (this.body.x), y: (this.body.y), sprite: this}); //set up the health bar for the sprite
	
		this.move("s");
		
	}

	move(dir){ //allows the sprite to move (r=right, l=left, s=stop, j=jump, h=hit, hr=hit+right hl=hit+left, jh=jump attack)
		
		if(dir == "r"){ 
			
			this.body.velocity.x = this.speed;
		    this.anims.play('gladiator_forward', true);
			this.flipX = true;
			
		}else if(dir == "l"){
			
			this.body.velocity.x = -this.speed;
		    this.anims.play('gladiator_forward', true);
			this.flipX = false;
			
		}else if(dir == "s"){
			
			this.body.velocity.x = 0;
		    this.anims.play('gladiator_stop', true);
			
		}else if(dir == "j"){
			
			this.body.velocity.y = this.jumpStrength;
			
		}
	
			
			if(dir == "h"){
			
				this.body.velocity.x = 0;
				this.anims.play('gladiator_attack', true);
			
			}else if(dir == "hs"){
			
				this.body.velocity.x = 0;
				this.anims.play('gladiator_hit_short', true);
			
			}else if(dir == "hl"){
			
				this.body.velocity.x = -this.speed*.75;
				this.anims.play('gladiator_attack_forward', true);
			
			}else if(dir == "hr"){
			
				this.body.velocity.x = this.speed*.75;
				this.anims.play('gladiator_attack_forward', true);
			
			}else if(dir == "jh"){
			
				this.body.velocity.x = 0;
				this.anims.play('gladiator_jump_attack', true);
				this.body.setGravityY(1000);
				this.body.bounce.set(0.0);
				this.holdJumpHit = true;
			
			}
			
			 //setTimeout(function(){ this.canAttack = false; }, 3000);
		
	};
	
}


