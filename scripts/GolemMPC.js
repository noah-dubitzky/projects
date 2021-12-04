//This is the mpc class for the golem

class GolemMPC extends Character {
	
	constructor(config){
		super(config);
			
		this.name = "golem";
		this.isMPC = false; //eventhough the sprite is an MPC, this variable is false. This means that after hit, the golem will reset after 350 ms.
		this.type = "golem";
		
		var golem = this; //use this variable to extend the scope of the class
		this.scene = config.scene; //use variable to create local scope of config.scene
		
		config.scene.enemyNPCs.add(this); //add the sprite to the enemyNPCs group
		
		this.health = 75;
		
		this.canAttack = true;
		
		this.knockBack = this.scene.config.width / 4;
		this.damage = 7;
		
		this.velocity = 400;
		this.traj = -150;
		
		this.hitRate = 1200;
		
		this.knockBackResistance = 1.3;
		
		this.resetTime = 500;
		//this is the amount of time it takes for the golem to reset the getsHit variable
		//The golem an attack again either after the resetAttack interval completes, or after the resetHit function is called in the character class. 
		
		this.superHitRate = 7;
		this.hitCounter = 0; //this counter is incremented everytime a boulder is launched. once it reaches the values of this.superHitRate, it resets and launches a super attack
		
		this.rescale = this.scene.config.height*0.002; //set rescale value for the golem
		
		this.newSizeY = this.rescale*80;	//record the size of the sprite so that it can be used by other functions
		this.newSizeX = this.rescale*80;
		
		this.body.setSize(80, 80, true); //adjust the size of the hitbox
		this.body.setOffset(4, 4); //adjust the offset of the hitbox
		
		this.setScale(this.rescale); //use the config variable from the scene the rescale the sprite
		
		this.move("s"); //set the first frame of the sprite
		
		this.attackDistance = (this.scene.config.width*0.5);
		
		this.targets = [config.scene.mainPlayers];
		this.selectedTarget = this.targets[0].getChildren()[0];
		
		this.speed = this.speed / 1.8;
		
		this.health_bar = new HealthBar({scene: config.scene, x: (this.body.x), y: (this.body.y), sprite: this}); //set up the health bar for the sprite
		
		/* this is the code that shows the hitbox of the sprite
		this.scene.graphics = this.scene.add.graphics();
		
		this.scene.rectD = new Phaser.Geom.Rectangle(0, 0, this.newSizeX, this.newSizeY);
		*/
		
	}
	
	preUpdate(time, delta){ //this is the update function
		super.preUpdate(time, delta); //init update function
		
		/* this code draw the hitbox on the canvas
		this.scene.graphics.clear();
		
		this.scene.rectD.setPosition(this.body.x, this.body.y);
		this.scene.rectD.setSize( this.newSizeY, this.newSizeY);
	
		this.scene.graphics.lineStyle(1, 0x9966ff);
		this.scene.graphics.strokeRectShape(this.scene.rectD);
		*/
		
		if(this.getHitRight || this.getHitLeft){
			
			//The golem an attack again either after the resetAttack interval completes, or after the resetHit function is called in the character class.
			
			clearTimeout(this.resetAttack);

				//first, check to see if the target is still defined. Then, check if the body of the target is defined. if not, it means that the target has been destroyed and the NPC should stop moving
				//if this.config.scene.sceneEnd is true, then the scene is over and the NPC should stop moving 
		}else if( !( this.selectedTarget == undefined ) && !( this.selectedTarget.body == undefined ) && !(this.scene.sceneEnd)  ){

			if(this.canAttack){

				if(this.body.x > (this.selectedTarget.body.x + this.attackDistance) ){
					
					this.move("l");
					
				}else if(this.body.x < (this.selectedTarget.body.x - this.attackDistance)){
					
					this.move("r");
					
				}else{
					
					//if the target is within firing distance, then run the load arrow procedure written bellow
					
					this.move("f"); //run the fire animation
					
					var sprite = this;
					var resetArms = setTimeout( function(){
						
						sprite.move("re");
						
					}, 200);
					
					this.canAttack = false;
					
					
					this.hitCounter++;
					
					if(this.hitCounter == this.superHitRate){
			
						this.superLaunch(this);
						
						this.hitCounter = 0;
						
					}else{
						
						this.launchBoulder(this);
						
					}
						
					this.resetAttack = setTimeout(this.allowAttack, this.hitRate, this);
					
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
	
	launchBoulder(config){
		
		var distance = config.selectedTarget.body.x - config.body.x; //record the distance between the golem and the enemy
		var direction = true; //set the variable the tells the function in which direction to fire the boulder relative to the golem_fire
							  //this variable is used to define the FlipX parameter in the boulder class

			//determine how far the golem should throw the boulder depending on how far away the enemy is 
			if( distance > (-1 * config.scene.config.width*0.1) &&  distance < (config.scene.config.width*0.1)){
		
				config.traj = -1 * (config.scene.config.width / 32 );
				config.velocity = config.scene.config.width / 10.6 ;
			
			}else if( distance > (-1 * config.scene.config.width*0.2) &&  distance < (config.scene.config.width*0.2) ){
				
				config.traj = -1 * (config.scene.config.width / 16);
				config.velocity = (config.scene.config.width / 6.4);
				
			}else if( distance > (-1 * config.scene.config.width*0.3) &&  distance < (config.scene.config.width*0.3) ){
				
				config.traj = -1 * (config.scene.config.width / 8);
				config.velocity = (config.scene.config.width / 4.6);
				
			}else if( distance > (-1 * config.scene.config.width*0.4) &&  distance < (config.scene.config.width*0.4) ){
				
				config.traj = -1 * (config.scene.config.width / 5.3);
				config.velocity = (config.scene.config.width / 3.6);
				
			}else{
				
				config.traj = -1 * (config.scene.config.width / 3.2);
				config.velocity = (config.scene.config.width / 4);
				
			}
			
			if(distance < 0){
				
				direction = false; //if the distance is negative, the FlipX in the boulder class is false
				
			}
		
		//fire the boulder
		var boulder = new Boulder({scene: config.scene, x: config.body.x + config.newSizeX * 0.5, y: config.body.y - config.newSizeY * 0.8, rescale: config.rescale, flipX: direction, targets: config.targets, parent: config});      
		
	}
	
	
	superLaunch(config){
		
		config.traj = -1 * (config.scene.config.width / 5.3);
		config.velocity = (config.scene.config.width / 16);
		
		var boulder1 = new Boulder({scene: config.scene, x: config.body.x + config.newSizeX * 0.5, y: config.body.y - config.newSizeY * 0.8, rescale: config.rescale, flipX: false, targets: config.targets, parent: config});  
		
		config.traj = -1 * (config.scene.config.width / 5.3);
		config.velocity = (config.scene.config.width / 5.3);
		
		var boulder2 = new Boulder({scene: config.scene, x: config.body.x + config.newSizeX * 0.5, y: config.body.y - config.newSizeY * 0.8, rescale: config.rescale, flipX: false, targets: config.targets, parent: config});  
		
		config.traj = -1 * (config.scene.config.width / 5.3);
		config.velocity = (config.scene.config.width / 16);
		
		var boulder3 = new Boulder({scene: config.scene, x: config.body.x + config.newSizeX * 0.5, y: config.body.y - config.newSizeY * 0.8, rescale: config.rescale, flipX: true, targets: config.targets, parent: config});  
		
		config.traj = -1 * (config.scene.config.width / 5.3);;
		config.velocity = (config.scene.config.width / 5.3);
		
		var boulder4 = new Boulder({scene: config.scene, x: config.body.x + config.newSizeX * 0.5, y: config.body.y - config.newSizeY * 0.8, rescale: config.rescale, flipX: true, targets: config.targets, parent: config});  
		
		
	}
	
	allowAttack(sprite){
		
		if(!(sprite.getHitLeft) && !(sprite.getHitRight) ){
			
			sprite.canAttack = true;
			
		}
		
	}
	
	move(dir){ //allows the sprite to move (r=right, l=left, s=stop, j=jump, h=hit, hr=hit+right hl=hit+left, jh=jump attack)
		
		if(dir == "r"){ 
			
			this.body.velocity.x = this.speed;
		    this.anims.play('golem_forward', true);
			this.flipX = true;
			
		}else if(dir == "l"){
			
			this.body.velocity.x = -this.speed;
		    this.anims.play('golem_forward', true);
			this.flipX = false;
			
		}else if(dir == "re"){
			
		    this.anims.play('golem_stop', true);
			
		}else if(dir == "s"){
			
			this.body.velocity.x = 0;
		    this.anims.play('golem_stop', true);
			
		}else if(dir == "f"){
			
			this.body.velocity.x = 0;
		    this.anims.play('golem_fire', true);
			
		}
		
	};
}