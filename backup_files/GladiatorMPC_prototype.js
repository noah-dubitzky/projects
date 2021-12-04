//this is a gladiator sprite that is controled by the computer

class GladiatorMPC extends Gladiator { //extend from the sprite class
    constructor(config) {
        super(config); //variables for the gladiator

		this.targets = [config.scene.archerPlayers]; //set the targets of the MPC
		
		this.selectedTarget = this.targets[0].getChildren()[0]; //get the first sprite of the first target group

	    var randInt = Math.floor(Math.random() * 10) * .02; 
		this.hitMargin = randInt * this.newSize;  //use this variable to ensure that not every gladiatorMPC attacks at the same spot,vatiable used in preUpdate method
		//we do this by slights shrinking the size of the hitbox
		this.hitArea[0] = this.hitArea[0] - this.hitMargin; //use variable to change the size of the hitbox
		this.hitArea[1] = this.hitArea[1] - this.hitMargin; //use variable to change the size of the hitbox

		config.scene.gladiatorMPCs.add(this); //add the gladiator to the "gladiatorMPCs" group

		this.health = 3;
		this.speed =  randInt*this.speed + this.speed;
	}

	preUpdate(time, delta){ //this is the update function
		super.preUpdate(time, delta); //init update function

		if(this.getHitRight || this.getHitLeft){

		}else if(this.selectedTarget.body != null){

			if(this.canAttack){

				if(this.selectedTarget.body.x > (this.body.x + this.hitArea[0] + this.hitArea[2]) ){
					this.move("r");
				}else if( (this.selectedTarget.body.x + this.selectedTarget.newSize) < (this.body.x - this.hitArea[1]) ){
					this.move("l");
				}else if( (this.selectedTarget.body.x) <= (this.body.x - this.hitArea[1] + this.hitArea[2]) && this.flipX ){
					
					this.flipX = false;
					
					var randInt = Math.floor(Math.random() * 10);
					
					if(randInt >= 8){
						
						this.startHit( "super");
						
					}else{
						
						this.startHit( "normal");
						
					}
					
				}else if( (this.selectedTarget.body.x + this.selectedTarget.newSize) >= (this.body.x + this.hitArea[0]) && !(this.flipX) ){
					
					this.flipX = true;
					
					var randInt = Math.floor(Math.random() * 10);
					
					if(randInt >= 8){
						
						this.startHit( "super");
						
					}else{
						
						this.startHit( "normal");
						
					}
					
				}else{
					
					var randInt = Math.floor(Math.random() * 10);
					
					if(randInt >= 8){
						
						this.startHit( "super");
						
					}else{
						
						this.startHit( "normal");
						
					}
					
				}
				
			}
			
		}else{
			this.move("s");
		}
		
		if(this.holdJumpHit && this.body.touching.down){
			
			this.body.setGravityY(100);
			this.body.bounce.set(0.2);
				
			this.registerHit(this, this.superAttackStrength); //register a hit in 10 milliseconds
	
			this.holdJumpHit = false;
				
			var proceedAttacking = setTimeout( this.allowAttack, 700, this); //have galdiator hold the hit for one second
			this.resetHitArea(this); //have galdiator hold the hit for one second
			
		}
		
	}

	allowAttack(config){ //allows gladiator to attack again
		
		config.canAttack = true;

	};

	registerHit(config , hitStrength){ //tells the gladiator to look for a target and register a hit 

	  for(var j = 0; j < config.targets.length; j++){
		
		for(var i = 0; i < config.targets[j].getChildren().length; i++) {
			var sprite = config.targets[j].getChildren()[i];
			
			if(config.flipX){
				
				var gladiatorRect = new Phaser.Geom.Rectangle(config.body.x + config.hitArea[0], config.body.y + config.newSize*.7, config.hitArea[2], config.newSize*.3);
				var targetRect = new Phaser.Geom.Rectangle(sprite.body.x, sprite.body.y , sprite.newSize, sprite.newSize);
				
				if (Phaser.Geom.Intersects.RectangleToRectangle(gladiatorRect, targetRect) ){
					
					if( (config.body.x + config.newSize*.6) > (sprite.body.x + sprite.newSize*.5) ){
						sprite.getsHit("r", hitStrength); //register a hit left for the archer
						
						//window.alert("hit");
					}else{
						sprite.getsHit("l", hitStrength); //register a hit left for the archerd
						
						//window.alert("hit");
					}
					
				}
			}else{
				
				var gladiatorRect1 = new Phaser.Geom.Rectangle(config.body.x - config.hitArea[1], config.body.y + config.newSize*.7, config.hitArea[2], config.newSize*.3);
				var targetRect1 = new Phaser.Geom.Rectangle(sprite.body.x, sprite.body.y, sprite.newSize, sprite.newSize);
				
				if ( Phaser.Geom.Intersects.RectangleToRectangle(gladiatorRect1, targetRect1) ){
					
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
	
	startJumpHit(config){
		
		config.holdJumpHit = true;
		
		config.move("jh");
		
	}
	
	startHit(attack){
		
		if(attack == "normal"){
		
			this.move("hs");
			var hit = setTimeout( this.registerHit, 200, this, this.attackStrength); //register a hit in 200 milliseconds
			
			this.canAttack = false;

			var proceedAttacking = setTimeout( this.allowAttack, 700, this); //have galdiator hold the hit for one second
		
		}else if(attack == "super"){
			
			this.move("s");
			this.move("j");
			
			this.body.velocity.x = 0;
			
			var proceedAttacking = setTimeout( this.startJumpHit, 700, this); //run the jump hit function in 700 ms
				
			this.canAttack = false; //cant attack until this is declared true
				
			this.hitArea = [-this.newSize*1.5, this.newSize*1.5, this.newSize*4]; //set the boundaries larger for the hitarea of the gladiator
			
		}
		
	}
	
}





