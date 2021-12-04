//this is the archerMPC class that creates a computer controled archer
class ArcherMPC extends Archer{
	
	constructor(config){
		super(config)
		
		var archer = this;
		archer.config = config; //allow local config variable
		
		this.isMPC = true;
		
		//adjust the size, scale, and hitbox of the sprite
		this.rescale = this.scene.config.height*0.0006; //set the scale of the sprite based off the size of the window
		
		this.newSizeY = this.rescale*116;
		this.newSizeX = this.rescale*68;
		
		this.body.setSize(68, 116, true); //adjust the size of the hitbox
		this.body.setOffset(16,0); //adjust the position of the hitbox
		
		this.setScale(this.rescale); //adjust scale
		
		this.health = 8; //set health
		this.speed = this.speed * 1.6; //set speed
		this.jumpStrength = this.jumpStrength / 1.33;
		
		this.loadSpeed = 700;
		this.arrowAttack = 1;
		
		this.team = "bad";

		//this.tint = 0.5 * 0xdddddd;
		
		config.scene.enemyNPCs.add(this); //add the sprite to the enemyNPCs group
		
		this.health_bar = new HealthBar({scene: config.scene, x: (this.body.x), y: (this.body.y), sprite: this}); //set up the health bar for the sprite
		
		this.move("s");
		
		var randInt = Math.floor(Math.random() * 10) * .1; 
	
		this.attackDistance = (this.scene.config.width*0.1)*randInt + this.scene.config.width*0.2;//use this variable to ensure that not every gladiatorMPC attacks at the same spot,vatiable used in preUpdate method
	
		this.speed =  randInt*(this.speed / 4) + (this.speed / 2); //set random speed 
		
		this.targets = [config.scene.mainPlayers];
		this.selectedTarget = this.targets[0].getChildren()[0];
		
		this.setIntervalFire; //this is the name of the interval timeout that tells the archer to fire after a certain amount of time
		
		this.name = "archer";
		
		
		//make changes to the helper intro scene
		
	}
	
	
	preUpdate(time, delta){ //this is the update function
		super.preUpdate(time, delta); //init update function
		
		if(this.getHitRight || this.getHitLeft){
			
			clearTimeout(this.setIntervalFire); //clear the interval that runs the fireArrow function

				//first, check to see if the target is still defined. Then, check if the body of the target is defined. if not, it means that the target has been destroyed and the NPC should stop moving
				//if this.config.scene.sceneEnd is true, then the scene is over and the NPC should stop moving 
		}else if( !( this.selectedTarget == undefined ) && !( this.selectedTarget.body == undefined ) && !(this.config.scene.sceneEnd)  ){

			if(this.canFire){

				if(this.body.x > (this.selectedTarget.body.x + this.attackDistance) ){
					
					this.move("l");
					
				}else if(this.body.x < (this.selectedTarget.body.x - this.attackDistance)){
					
					this.move("r");
					
				}else{
					
					//if the target is within firing distance, then run the load arrow procedure written bellow
					
					this.move("lo"); //run the load arrow animation
					
					this.arrowLoaded = true; //load an arrow
					this.canFire = false; //set this variable to false so that the sprite cannot restart the attacking process or load another arrow
					
					//after the load speed is complete, run the fire arrow function
					this.setIntervalFire = setTimeout(this.fireArrow, this.loadSpeed, this);
		
				}
				
				if(this.selectedTarget.body.x > this.body.x){
					
					this.flipX = true;
					
				}else{
					
					this.flipX = false;
					
				}
				
			}
			
		}else{
			
			this.move("s");
			
		}
		
	}
	
	fireArrow(sprite){
		
		sprite.body.velocity.x = 0;
		sprite.move("f");
		
		sprite.ArrowFire(sprite.config);
		
		//the canFire variable is set to true and arrowLoaded variable is set to false in the Archer parent class (in the ArrowFire() function)
		
	}
	
	
	move(dir){ //allows the sprite to move (r=right, l=left, s=stop, j=jump, lo=load, f=fire)
		
		if(dir == "r"){ 
			
			this.body.velocity.x = this.speed;
		    this.anims.play('archer_MPC_forward', true);
			this.flipX = true;
			
		}else if(dir == "l"){
			
			this.body.velocity.x = -this.speed;
		    this.anims.play('archer_MPC_forward', true);
			this.flipX = false;
			
		}else if(dir == "s"){
			
			this.body.velocity.x = 0;
		    this.anims.play('archer_MPC_stop', true);
			
		}else if(dir == "j"){
			
			this.body.velocity.x = 0;
			this.body.velocity.y = this.jump;
			
		}else if(dir == "lo"){
			
			this.body.velocity.x = 0;
		    this.anims.play('archer_MPC_load', true);
			
		}else if(dir == "f"){
			
			this.body.velocity.x = 0;
		    this.anims.play('archer_MPC_fire', true);
			
		}
		
		
	};
	
}