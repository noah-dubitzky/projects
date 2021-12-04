
class ArcherPlayer extends Archer { //extend from the sprite class
    constructor(config) {
		super(config);
		
		var archer = this;
		archer.config = config; //allow local config variable
		
		//adjust the size, scale, and hitbox of the sprite
		this.rescale = this.scene.config.height*0.0006; //set the scale of the sprite based off the size of the window
		this.newSizeY = this.rescale*116;
		this.newSizeX = this.rescale*68;
		this.body.setSize(68, 116, true); //adjust the size of the hitbox
		this.body.setOffset(16,0); //adjust the position of the hitbox
		
		this.setScale(this.rescale); //adjust scale
		
		this.health = 12; //set health 
		this.resetTime = 350;
		this.speed = this.speed / 1;
		
		this.jumpStrength = this.jumpStrength / 1.33;
		
		this.loadSpeed = 700;  //700
		this.arrowAttack = 3;  //3
		
		this.runningFire = true; //allow for the archer to run while holding the released fire position
		
		config.scene.mainPlayers.add(this); //add the sprite the main Players group
		
		this.health_bar = new HealthBar({scene: config.scene, x: (this.body.x), y: (this.body.y), sprite: this}); //set up the health bar for the sprite
		
		this.move("s");
		
		

		//declare the keys used for the user input
		const { LEFT, RIGHT, UP, DOWN, SPACE, W, A, S, D } = Phaser.Input.Keyboard.KeyCodes;
		archer.keys = this.scene.input.keyboard.addKeys({
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
		 archer.scene.input.keyboard.on('keyup_A', function (event) {
			 
			if(!archer.isDead)
			{
				archer.move("s");
			}
			
		});
		archer.scene.input.keyboard.on('keyup_D', function (event) {
			
			if(!archer.isDead)
			{
				archer.move("s");
			}
		   
		});
		archer.scene.input.keyboard.on('keyup_SPACE', function (event) {
		   
		   if(archer.arrowLoaded && !archer.isDead){  //fire arrow if an arrow is loaded
				archer.move("f"); //run the fire animation
				archer.ArrowFire(archer.config); //run the arrow fire function
		   }
		   
		});
	}

	preUpdate(time, delta){ //this is the update function
		
		super.preUpdate(time, delta); //init update function

		//allow for non-stop movement (left, right, load, fire)
		if(this.getHitRight || this.getHitLeft){
			
			clearTimeout(this.resetFire); //once the sprite is hit, the timer that resets the canFire variable of the sprite is canceled
			
			//user cannot move character if they are hit
			
		}else if (this.keys.a.isDown){
			
			if(this.keys.space.isDown && this.canFire){
				
				this.move("ll");
				this.arrowLoaded = true;
				
			}else{
				
				this.move("l");
				this.arrowLoaded = false;
				
			}
			
		}else if(this.keys.d.isDown){
			
			if(this.keys.space.isDown && this.canFire){
				
				this.move("lr");
				this.arrowLoaded = true;
				
			}else{
				
				this.move("r");
				this.arrowLoaded = false;
				
			}
			
		}else if(this.keys.space.isDown){
			
		   if(this.canFire){ //can only fire if the canFire variable allows it
		   
				this.move("lo"); 
				this.arrowLoaded = true;
				
				if(this.body.touching.down){
					
					this.body.velocity.x = 0;
					
				}
				
		   }
		}else if( this.body.touching.down ){
			
			this.move("s");
			
		}
		
		//allow for jump
		if (this.keys.w.isDown && this.body.touching.down){
		
            this.move("j");
			
        }

	}
	
	move(dir){ //allows the sprite to move (r=right, l=left, s=stop, j=jump, lo=load, f=fire)
		
		if(dir == "r"){ 
			
			this.body.velocity.x = this.speed;
		    this.anims.play('archer_forward', true);
			this.flipX = true;
			
		}else if(dir == "l"){
			
			this.body.velocity.x = -this.speed;
		    this.anims.play('archer_forward', true);
			this.flipX = false;
			
		}else if(dir == "lr"){ 
			
			this.body.velocity.x = this.speed;
		    this.anims.play('archer_forward_load', true);
			this.flipX = true;
			
		}else if(dir == "ll"){ 
			
			this.body.velocity.x = -this.speed;
		    this.anims.play('archer_forward_load', true);
			this.flipX = false;
			
		}else if(dir == "fr"){ 
			
			this.body.velocity.x = this.speed;
		    this.anims.play('archer_forward_fire', true);
			this.flipX = true;
			
		}else if(dir == "fl"){ 
			
			this.body.velocity.x = -this.speed;
		    this.anims.play('archer_forward_fire', true);
			this.flipX = false;
			
		}else if(dir == "s"){
			
			this.body.velocity.x = 0;
		    this.anims.play('archer_stop', true);
			
		}else if(dir == "j"){
			
			this.body.velocity.x = 0;
			this.body.velocity.y = this.jumpStrength;
			
		}else if(dir == "lo"){
			
			//this.body.velocity.x = 0;
		    this.anims.play('archer_load', true);
			
		}else if(dir == "f"){
			
			//this.body.velocity.x = 0;
		    this.anims.play('archer_fire', true);
			
		}
		
		
	};

}