//class for gladiator with keyboard inputs

class Gladiator extends Phaser.GameObjects.Sprite { //extend from the sprite class
    constructor(config) {
        super(config.scene, config.x, config.y, "gladiator"); //variables for the gladiator
		
		var gladiator = this; //use this variable to extend the scope of the class
		this.scene = config.scene; //use variable to create local scope of config.scene
		
		this.canAttack = true; //allows attack
		
		this.getHitLeft = false; //indicates if the sprite is being hit
		this.getHitRight = false;
		
		this.holdJumpHit = false; //indicates if the sprite is holding a "hit jump"
		this.allowHit = true; //indicates if the sprite can register a hit, prevents multiple hits at once
		
		config.scene.add.existing(this); //add the sprite to the scene
		config.scene.physics.world.enableBody(this); //give it physics

		this.body.setCollideWorldBounds(true);
		
		this.health = 10; //declare health 
		this.attackStrength = 2; //declare attack strength
		this.superAttackStrength = 4;
		this.speed = 250;
		
		this.rescale = this.scene.config.height*0.00075; //set rescale value for the gladiator
		this.newSize = this.rescale*108;
		this.body.setSize(70, 108, true); //adjust the size of the hitbox
		this.body.setOffset(20,0);
		
		this.hitArea = [this.newSize*.6, this.newSize*.2, this.newSize*.4]; //set the boundaries for the hit radius of the gladiator
		
		//adjust the small details of sprite
		this.setScale(this.rescale); //use the config variable from the scene 
		this.body.bounce.set(0.2);
		this.move("s");

		this.targets = [config.scene.archerPlayers]; //set archers as one of the targets of the sprites
				
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
			
			this.body.velocity.y = -330;
			
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
	
	allowAttack(){ //allows gladiator to attack again
		
		config.canAttack = true;

	};
  
	destroySelf(){

		var config = this; //declare local instance variable

		this.getHitLeft = true; //make it so the sprite cant move

		var set = setTimeout(function(){ //destroy the sprite in 300 ms
			config.destroy(); //destroy the sprite
		}, 300);

		this.tint = 0xff00ff; //tint the sprite red

	}

    getsHit(dir, damage){ //tells the gladiator to get hit
		
		this.health -= damage; //have the sprite take damage

		this.move("s");  

		if(this.health <= 0){
			
			this.destroySelf(); //destroy the sprite

		}
		
		//make the sprite jump in the air and move back
		if(dir == "l"){
			
			this.getHitLeft = true;
			
			this.body.velocity.y = -200;
			this.body.velocity.x = 300;
			
		}else{
			
			this.getHitRight = true;
			
			this.body.velocity.y = -200;
			this.body.velocity.x = -300;
			
		}
		
	}
	
	registerHit(config , hitStrength){ //tells the gladiator to look for a target and register a hit 

	  for(var j = 0; j < config.targets.length; j++){
		
		for(var i = 0; i < config.targets[j].getChildren().length; i++) {
			var sprite = config.targets[j].getChildren()[i];
			
			/*if(config.flipX){

				//window.alert(sprite.body.x);
				//sprite.getsHit("l", hitStrength); //

				//check to see if the archer is within the hit area of the sprite
				if(config.keys.space.isDown && sprite.body.x < (config.body.x + config.hitArea[2]) && (sprite.body.x + sprite.size) > ( config.body.x + config.hitArea[1])){
					//check to see if the sprite is within the y hit area of the gladiator
					if(sprite.body.y < ( config.body.y + sprite.size) && sprite.body.y > ( config.body.y - sprite.size) ){
						
						if((sprite.size*.5 + sprite.body.x) < (config.body.x + config.hitArea[2])){
							sprite.getsHit("r", hitStrength); //register a hit left for the archer
						}else{
							
							sprite.getsHit("l", hitStrength); //register a hit left for the archer
							
						}
					}
				}

			}else{

				//check to see if the archer is within the hit area of the sprite
				if(config.keys.space.isDown && sprite.body.x < (config.body.x + config.hitArea[0]) && (sprite.body.x + sprite.size) > ( config.body.x)){
					//check to see if the sprite is within the y hit area of the gladiator
					if(sprite.body.y < ( config.body.y + sprite.size) && sprite.body.y > ( config.body.y - sprite.size) ){
						
						if((sprite.size*.5 + sprite.body.x) < (config.body.x + config.hitArea[0])){
							sprite.getsHit("r", hitStrength); //register a hit left for the archer
						}else{
							
							sprite.getsHit("l", hitStrength); //register a hit left for the archer
							
						}
					}
				}
				
				


			}
			*/
		
			if(config.flipX){
				
				var gladiatorRect = new Phaser.Geom.Rectangle(config.body.x + config.hitArea[0], config.body.y, config.hitArea[2], config.newSize);
				var targetRect = new Phaser.Geom.Rectangle(sprite.body.x, sprite.body.y , sprite.newSize, sprite.newSize);
				
				if (Phaser.Geom.Intersects.RectangleToRectangle(gladiatorRect, targetRect) && config.keys.space.isDown){
					
					if( (config.body.x + config.newSize*.6) > (sprite.body.x + sprite.newSize*.5) ){
						sprite.getsHit("r", hitStrength); //register a hit left for the archer
					}else{
						sprite.getsHit("l", hitStrength); //register a hit left for the archerd
					}
					
				}
			}else{
				
				var gladiatorRect1 = new Phaser.Geom.Rectangle(config.body.x - config.hitArea[1], config.body.y, config.hitArea[2], config.newSize);
				var targetRect1 = new Phaser.Geom.Rectangle(sprite.body.x, sprite.body.y, sprite.newSize, sprite.newSize);
				
				if ( Phaser.Geom.Intersects.RectangleToRectangle(gladiatorRect1, targetRect1) && config.keys.space.isDown){
					
					if( (config.body.x - config.newSize*.2) < (sprite.body.x + sprite.newSize*.5) ){
						
						sprite.getsHit("l", hitStrength); //register a hit left for the archer
						
					}else{
						
						sprite.getsHit("r", hitStrength); //register a hit left for the archer
						
					}
					
				}
			}
		
		
		}
      }
		
	};

	hitGround(){ //this function is required to be set to the sprite collider with the ground
		
		if(this.getHitLeft || this.getHitRight){

			this.body.velocity.x = 0;
		
			if(this.health > 0){
				this.getHitLeft = false;  //allow the sprite to move again once it hits the ground
				this.getHitRight = false;
			}

		}

	}

	resetHitArea(config){
		
		config.hitArea = [config.newSize*.6, config.newSize*.2, config.newSize*.4]; //reset the hitarea of the sprite
		
	}
//these functions are used for a player controled sprite 

	updatePlayerActions(){ //update the actions of the player from the key inputs
		if(this.getHitRight || this.getHitLeft){
			
			//user cannot move character if they are hit
			
		}else if(this.keys.space.isDown){
			
			if(this.canAttack && this.allowHit){
				
				this.canAttack = false; //cant attack until this is declared true
				
			 if(!this.body.touching.down){
				 
				this.move("jh");
				 
			 }else if(this.keys.d.isDown){
				
				this.move("hr");

				var hit = setTimeout( this.registerHit, 200, this, this.attackStrength); //register a hit in 200 milliseconds
				this.allowHit = false;
				
			}else if(this.keys.a.isDown){
				
				this.move("hl");

				var hit = setTimeout( this.registerHit, 200, this, this.attackStrength); //register a hit in 200 milliseconds
				this.allowHit = false;
				
			}else if(!this.keys.a.isDown && !this.keys.d.isDown && !this.holdJumpHit){
			
				this.move("h");

				var hit = setTimeout( this.registerHit, 200, this, this.attackStrength); //register a hit in 200 milliseconds
				this.allowHit = false;
			    
			}
		   }
		}else if (this.keys.a.isDown){
			
			this.move("l");
			
		}else if(this.keys.d.isDown){
			
			this.move("r");
			
		}
	
		//allow for jump
		if (this.keys.w.isDown && this.body.touching.down && !this.holdJumpHit){
		
            this.move("j");
			
        }
		
		
		if(this.body.touching.down){
			
			this.body.setGravityY(100);
			this.body.bounce.set(0.2);

			if(this.holdJumpHit && this.allowHit){
				this.registerHit(this, this.superAttackStrength); //register a super hit

				this.allowHit = false;
			}
			
		}
	}

	setUpKeyInputs(gladiator){ //set up the keyboard actions and the key event listeners for the gladiator (parameter should be "this") *should be declared in constructor

	//declare the keys used for the user input
		const { LEFT, RIGHT, UP, DOWN, SPACE, W, A, S, D } = Phaser.Input.Keyboard.KeyCodes;
		gladiator.keys = this.scene.input.keyboard.addKeys({
			left: LEFT,
			right: RIGHT,
			up: UP,
			down: DOWN,
			space: SPACE,
			w: W,
			a: A,
			s: S,
			d: D,
		});
		
		
		//set all keyup events to play the "stop" animation for sprite
		 gladiator.scene.input.keyboard.on('keyup_A', function (event) {
		   gladiator.move("s");
		});
		gladiator.scene.input.keyboard.on('keyup_D', function (event) {
		   gladiator.move("s");
		});
		gladiator.scene.input.keyboard.on('keyup_SPACE', function (event) {
		   gladiator.move("s");
		   
		   gladiator.holdJumpHit = false; //release the jump attack animation
			
		   gladiator.allowHit = true;
		   
		   gladiator.canAttack = true; //allow the gladiator to attack again
		});

		
	}

}

