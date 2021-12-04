//class for all Characters in game

class Character extends Phaser.GameObjects.Sprite { //extend from the sprite class
    constructor(config) {
        super(config.scene, config.x, config.y, "character"); //variables for the gladiator
		
		this.getHitLeft = false; //indicates if the sprite is being hit
		this.getHitRight = false;
		
		config.scene.add.existing(this); //add the sprite to the scene
		config.scene.physics.world.enableBody(this); //give it physics

		this.body.setCollideWorldBounds(true); //define the sprite to the confines of the world
		
		this.health; //declare health 
		this.speed = this.scene.config.width / 4; //declare speed
		this.jumpStrength = -1 * (this.scene.config.width / 4);
		
		this.rescale; //set rescale value for the gladiator
		this.newSizeX; //declare the new width of the sprite
		this.newSizeY; //declare the new height of the sprites
		
		this.isDead = false; //tell if the sprite is dead, prevents undefined errors
		
		this.anchorOffset = 0; //offsets the position at which the health bar hovers above the sprite (is the x offset)
		
		this.shieldOn = false; //declares if the shield is on
		
		this.immunity = false; //disallow the sprite from having immunity
		
		this.resetInterval;
		
		this.isMPC; //is true when the sprite is an MPC
		
		this.resetTime = 350;
		
		this.flipX = true;
		
		config.scene.characters.add(this);
		
    };
  
	destroySelf(){ //destroys the sprite

		if(!this.immunity){ //only allow the sprite to die if it does not have immunity 
		
			var config = this; //declare local instance variable

			this.getHitLeft = true; //make it so the sprite cant move

			var set = setTimeout(function(){ //destroy the sprite in 300 ms
			
				config.destroy(); //destroy the sprite
				config.isDead = true; //declare the sprite dead
				
			}, 300);

			this.tint = 0xff00ff; //tint the sprite red
			
		}
	}
	
	//the sprite can attack again once this function is called or when their allowAttack function runs. The allow attack function is not called in this class. 
	resetHit(sprite){
		
		if(sprite.getHitLeft || sprite.getHitRight){
			
			if(sprite.type == "archer"){
				
				sprite.canFire = true;
			
			}else if(sprite.type == "warrior"){
				
				sprite.canAttack = true; //reset attack variable 
				sprite.spaceUp = true; //reset attack variable 
				
			}else if("golem"){
				
				sprite.canAttack = true; //reset attack variable 
				
			}
		
			if(!sprite.isDead){ //only run if the sprite isnt dead
			
				sprite.getHitLeft = false;  //allow the sprite to move again once it hits the ground
				sprite.getHitRight = false;
					
			}

		}
		
	}

    getsHit(dir, damage, knockBack){ //tells the gladiator to get hit
	
		//certain capabilities of the sprite are taken away once they are hit
		if(this.type == "archer"){
		
			this.arrowLoaded = false;	//if the sprite has an arrow loaded 
			
			this.move("s");
			
		}else if(this.type == "warrior"){
			
			this.canAttack = false;	
		
			//these lines take of if the sprite is in the middle of a jump hit when attacking 
			this.holdJumpHit = false;  //the sprite cannot attack or fire arrow
			this.body.setGravityY(100);
			this.body.bounce.set(0.2);
			this.resetHitArea(this); //have galdiator hold the hit for one second		
		
			//if the warrior has their shield up, it stays up
			if(this.shieldOn){
			
				this.move("sh");
			
			}else{
			
				this.move("s");

			}
		
		}
		
		//make the sprite jump in the air and move back
		if(dir == "l"){
			
			this.getHitLeft = true;
			
			if(this.shieldOn && !this.flipX){
				
				this.body.velocity.y = -knockBack / 3;
				this.body.velocity.x = knockBack / 2;
				
				this.health -= damage*0.2; //have the sprite take damage
				
			}else if(this.type == "golem"){
				
				this.body.velocity.y = -knockBack / this.knockBackResistance;
				this.body.velocity.x = knockBack / this.knockBackResistance;
				
				this.health -= damage; //have the sprite take damage
				
			}else{
				
				this.body.velocity.y = -knockBack;
				this.body.velocity.x = knockBack;
				
				this.health -= damage; //have the sprite take damage
				
			}
			
		}else{
			
			this.getHitRight = true;
			
			if(this.shieldOn && this.flipX){
				
				this.body.velocity.y = -knockBack / 3;
				this.body.velocity.x = -knockBack / 2;
				
				this.health -= damage*0.2; //have the sprite take damage
				
			}else if(this.type == "golem"){
				
				this.body.velocity.y = -knockBack / this.knockBackResistance;
				this.body.velocity.x = -knockBack / this.knockBackResistance;
				
				this.health -= damage; //have the sprite take damage
				
			}else{
				
				this.body.velocity.y = -knockBack;
				this.body.velocity.x = -knockBack;
				
				this.health -= damage; //have the sprite take damage
				
			}
			
		}
		
		//check if the sprite should be destroyed
		if(this.health <= 0){
			
			this.destroySelf(); //destroy the sprite

		}
		
		
		if( !this.isMPC ){  //MPCs do not reset using this interval. they reset when they hit the ground in the hitGround Function. Players run the code below
			
			//if a player is hit consecutively, the previous timeout is cleared a new one starts. In other words, the timeout reset restarts
			clearInterval(this.resetInterval);
		
			this.resetInterval = setTimeout(this.resetHit, this.resetTime, this);
		
		}
	}
	
	hitGround(){ //this function is required to be set to the sprite collider with the ground
	
		if( this.isMPC){
			
			this.resetHit(this);
			
		}
		
		//if the sprite hits the ground when the shield is on, the sprite will not move. Because of the conditional statement of the warriorPlayer class, this 
		//precaution must take place
		
		if(this.type == "warrior" && this.shieldOn == true){
				
				this.body.velocity.x = 0;
				
		}

	}
	
	incrementHealthBy(value){
		
		this.health = this.health + value; //increment health value
		
		if(this.health >= this.health_bar.origionalHealth){ 
			
			//allow the health bar to reset by updating the origional health of the character so that the health bar knows what to compare the current health to
			this.health_bar.origionalHealth = this.health; 
			
		}
		
	}


	//steps taken once a sprite is hit:
	/*
	1. the GETSHIT() Function is called. First, certain capabilities for the sprite are taken away. Archers lose their loaded arrow, and warriors cannot attack, 
		along with many ather variables that are reset. Next, the getsHitLeft or getsHitRight variables are set to true. Virtually no actions can be done when
		these variables are set to true. Also, the sprite is given the set knockback, and the set damage is given. Next, the health is evaluated. If it is less 
		than 0, then the destroySelf() function is run. Lastly, the resetHit function is run after a certain amount of time. If the sprite is an MPC, then this 
		function isn't run until the sprite hits the ground. 
		
	2. If the sprite has no health, the DESTROYSELF function is run. This function only runs if the sprite has no immunity. The only time sprites are given immunnity
		is if the sprite is the main player and all of the enemies are dead. This prevents the main player from dying after all of the enemies are dead. If there
		is not immunity, the sprite is destroyed. This will set its .body class to undefined, by certain variables of the sprite will remain. 

    3. If the sprite is not an MPC, the RESETHIT() function will run after 350 ms. This function resets certain variables to allow the sprite to perform tasks.  
	
	4. If the sprite is an MPC, then the ResetHit() function will run in the HitGround() function. This function is called everytime a sprite collides with the ground
	
	*/
	
	
}



