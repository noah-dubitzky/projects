//class for warrior with keyboard inputs

class GladiatorPlayer extends WarriorPlayer { //extend from the sprite class

    constructor(config) {
        super(config); //variables for the gladiator
		
		var gladiator = this; //use this variable to extend the scope of the class
		this.scene = config.scene; //use variable to create local scope of config.scene
		
		//this.scene.gladiatorMPCs.add(this); //add the gladiator to the "gladiatorMPCs" group
		this.targets = [config.scene.archerPlayers]; //set archers as one of the targets of the sprites
		this.move("s"); //set the first frame of the sprite
		
		this.health = 1000; //adjust the health 
		this.speed = this.speed / 1.6; //adjust the speed
		this.jumpStrength = this.jumpStrength / 1.15;
		
		this.attackStrength = 2; //declare attack strength
		this.superAttackStrength = 4;
		
		this.rescale = this.scene.config.height*0.00075; //set rescale value for the gladiator
		this.newSizeY = this.rescale*100;
		this.newSizeX = this.rescale*72;
		
		//adjust the hit box of the sprite
		this.body.setSize(72, 100, true); //adjust the size of the hitbox
		this.body.setOffset(14,0); //adjust the offset of the hitbox
		
		this.setScale(this.rescale); //use the config variable from the scene 
		
		this.hitArea = [this.newSizeX*.8, this.newSizeX*.15, this.newSizeX*.45];  //set the boundaries for the hit radius of the gladiator 
		this.permanentHitArea = this.hitArea;
		this.superHitArea = [-this.newSizeX*1.5, this.newSizeX*1.5, this.newSizeX*4]; //set the larger boundaries for the super hit 
		
		this.health_bar = new HealthBar({scene: config.scene, x: (this.body.x), y: (this.body.y), sprite: this}); //set up the health bar for the sprite
				
    };
	
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
			
			}
			
			 //setTimeout(function(){ this.canAttack = false; }, 3000);
		
	};

}