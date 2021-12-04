//class for warrior with keyboard inputs

class WarriorPlayer extends Warrior { //extend from the sprite class

    constructor(config) {
        super(config); //variables for the gladiator
		
		var gladiator = this; //use this variable to extend the scope of the class
		this.scene = config.scene; //use variable to create local scope of config.scene
		
		this.isMPC = false;
		
		this.coolDownTime = 500; //allows the sprite to attack again after a certain amount of time

		//declare the keys used for the user input
		const { LEFT, RIGHT, UP, DOWN, SPACE, SHIFT, W, A, S, D } = Phaser.Input.Keyboard.KeyCodes;
		gladiator.keys = this.scene.input.keyboard.addKeys({
			left: LEFT,
			right: RIGHT,
			up: UP,
			down: DOWN,
			space: SPACE,
			shift: SHIFT,
			w: W,
			a: A,
			s: S,
			d: D,
		});
		
		
		//set all keyup events to play the "stop" animation for sprite
		 gladiator.scene.input.keyboard.on('keyup_A', function (event) {
			 
		   if(!gladiator.shieldOn && gladiator.spaceUp && !gladiator.isDead){
			   
				gladiator.move("s");
				
		   }	
		   
		});
		
		gladiator.scene.input.keyboard.on('keyup_D', function (event) {
			
		  if(!gladiator.shieldOn && gladiator.spaceUp && !gladiator.isDead){
			  
				gladiator.move("s");
				
		  }
		  
		});
		
		gladiator.scene.input.keyboard.on('keyup_SPACE', function (event) {
			
			if(!gladiator.isDead)
			{
				gladiator.body.setGravityY(100); //reset the gravity 
				gladiator.holdJumpHit = false; //release the jump attack animation
				gladiator.spaceUp = true; //allow the sprite to register a hit again
			
				if( !gladiator.getHitLeft && !gladiator.getHitRight){
				
					gladiator.move("s"); //the move("s") function is already called in the character.getsHit function when a sprite is hit
				}
			
				if( gladiator.shieldOn){
				
					gladiator.move("sh");  //keep the shield animation when sprite is hit and the shield is on
	
				}
			}
		});
		
		//pressing the shift key turns on the shield
		gladiator.scene.input.keyboard.on('keyup_SHIFT', function (event) {
			
			if(!gladiator.isDead)
			{
				gladiator.shieldOn = false;
				gladiator.move("s");
			}
			
		});
		
		gladiator.scene.input.keyboard.on('keydown_SHIFT', function (event) {
			
			if(!gladiator.isDead)
			{
				gladiator.shieldOn = true;
				gladiator.move("sh");
			}
			
		});
				
    };
	
	preUpdate(time, delta){ //this is the update function
		
		super.preUpdate(time, delta); //init update function

		this.updatePlayerActions();

	}
	
    updatePlayerActions(){ //update the actions of the player from the key inputs
	
		if( this.getHitRight || this.getHitLeft){
			
			//user cannot move character if they are hit or if the sheild is on
			
		}else if( this.shieldOn ){
			
			//allow the sprite to change the direction it is facing when holding a shield
			if (this.keys.a.isDown){ //if a is down
			
				this.flipX = false;
			
			}else if(this.keys.d.isDown){  //if d is down
			
				this.flipX = true;
			
			}
			
			
		}else if(this.keys.space.isDown){ //if space bar is down
			
			if(this.canAttack && this.spaceUp){ //a warrior player can only attack if the canAttack and spaceUp variables are set to true
				
				this.canAttack = false; //cant attack until this is declared true
				
				//set a cooldown for the sprite to be able to attack again
				this.attackCoolDown = setTimeout(this.allowAttack, this.coolDownTime, this);
				
			 if(!this.body.touching.down){	//if the sprite is in the air
					 
				this.move("jh"); //start the jump hit animation
					
				this.holdJumpHit = true; //allow the sprite to hold the animation
				 
			 }else if(this.keys.d.isDown){
				
				this.move("hr");

				var hit = setTimeout( this.registerHit, this.registerHitSpeed, this, this.attackStrength, this.knockBack); //register a hit in so many milliseconds  
				this.spaceUp = false; //cant attack until the space bar is released again
				
			 }else if(this.keys.a.isDown){
				
				this.move("hl");

				var hit = setTimeout( this.registerHit, this.registerHitSpeed, this, this.attackStrength, this.knockBack); //register a hit in so many milliseconds  
				this.spaceUp = false; //cant attack until the space bar is released again
				
			 }else if(!this.keys.a.isDown && !this.keys.d.isDown && !this.holdJumpHit){ 
			
				this.move("h"); //execute the animation for a normal hit

				var hit = setTimeout( this.registerHit, this.registerHitSpeed, this, this.attackStrength, this.knockBack); //register a hit in so many milliseconds
				this.spaceUp = false; //cant attack until the space bar is released again
				
			 }
		   }
		   
		}else if (this.keys.a.isDown){ //if a is down
			
			this.move("l");
			
		}else if(this.keys.d.isDown){  //if d is down
			
			this.move("r");
			
		}else if( this.body.touching.down ){
				
			this.move("s");

		}
	
		//allow for jump
		if (this.keys.w.isDown && this.body.touching.down && !this.holdJumpHit && !this.shieldOn){
		
            this.move("j");
			
        }
		
		//this code takes care of when the sprite is doing a jump hit
		if(this.body.touching.down){
			
			this.body.setGravityY(100); //when a jumpHit is initiated, the gravity is set to 1000. When done, this line sets it back to 100

			if(this.holdJumpHit && this.spaceUp){ //once the sprite hits the ground after executing a jumpHit
				
				this.hitArea = [ this.superHitArea[0], this.superHitArea[1], this.superHitArea[2] ]; //set the boundaries larger for the hitarea of the gladiator
				
				this.registerHit(this, this.superAttackStrength, this.superKnockBack); //register a super hit by puttin the certain variables 

				//window.alert(this.superKnockBack);

				this.spaceUp = false; //prevent the sprite from registering another hit

				this.resetHitArea(this); //set back the hit area
				
				
			}
			
		}
	}


}

/* just some old code that could be used as a replacement
updatePlayerActions(){ //update the actions of the player from the key inputs
	
		if( this.getHitRight || this.getHitLeft || this.shieldOn){
			
			//user cannot move character if they are hit or if the sheild is on
			
		}else if(this.keys.space.isDown){ //if space bar is down
			
			if(this.canAttack && this.spaceUp){
				
				this.canAttack = false; //cant attack until this is declared true
				
				//set a cooldown for the sprite to be able to attack again
				this.attackCoolDown = setTimeout(this.allowAttack, 500, this);
				
			 if(!this.body.touching.down){	
					 
				this.move("jh"); //start the jump hit animation
					
				this.holdJumpHit = true; //allow the sprite to hold the animation
				 
			 }else if(this.keys.d.isDown){
				
				this.move("hr");

				var hit = setTimeout( this.registerHit, this.registerHitSpeed, this, this.attackStrength); //register a hit in so many milliseconds  
				this.spaceUp = false; //cant attack until the space bar is released again
				
			 }else if(this.keys.a.isDown){
				
				this.move("hl");

				var hit = setTimeout( this.registerHit, this.registerHitSpeed, this, this.attackStrength); //register a hit in so many milliseconds  
				this.spaceUp = false; //cant attack until the space bar is released again
				
			 }else if(!this.keys.a.isDown && !this.keys.d.isDown && !this.holdJumpHit){
			
				this.move("h");

				var hit = setTimeout( this.registerHit, this.registerHitSpeed, this, this.attackStrength); //register a hit in so many milliseconds
				this.spaceUp = false; //cant attack until the space bar is released again
				
			 }
		   }
		   
		}else if (this.keys.a.isDown){ //if a is down
			
			this.move("l");
			
		}else if(this.keys.d.isDown){  //if d is down
			
			this.move("r");
			
		}
	
		//allow for jump
		if (this.keys.w.isDown && this.body.touching.down && !this.holdJumpHit && !this.shieldOn){
		
            this.move("j");
			
        }
		
		
		if(this.body.touching.down){
			
			this.body.setGravityY(100);

			if(this.holdJumpHit && this.spaceUp){
				
				this.hitArea = [ this.superHitArea[0], this.superHitArea[1], this.superHitArea[2] ]; //set the boundaries larger for the hitarea of the gladiator
				
				this.registerHit(this, this.superAttackStrength); //register a super hit

				this.spaceUp = false; //prevent the sprite from attacking again

				this.resetHitArea(this); //set back the hit area
				
				
			}
			
		}
	}
	*/