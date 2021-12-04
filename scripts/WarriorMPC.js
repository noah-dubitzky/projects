

class WarriorMPC extends Warrior { //extend from the sprite class
    constructor(config) {
        super(config); //variables for the gladiator
		
		this.isMPC = true;
		
		var warrior = this;
		warrior.config = config; //allow local config variable
		
		this.resetTime = 700;
		
		this.targets = [config.scene.mainPlayers];
		
		this.index = this.targets[0].getChildren().length;
		
		this.num = Math.floor( Math.random() * this.index);
		this.selectedTarget = this.targets[0].getChildren()[this.num];
		
	}

	preUpdate(time, delta){ //this is the update function
		super.preUpdate(time, delta); //init update function
		
		if(this.getHitRight || this.getHitLeft){

		}else if(  !( this.selectedTarget == undefined ) && !( this.selectedTarget.body == undefined ) && !(this.config.scene.sceneEnd)  ){

			if(this.canAttack){

				if(this.selectedTarget.body.x > (this.body.x + this.permanentHitArea[0] + this.permanentHitArea[2]) ){
					this.move("r");
				}else if( (this.selectedTarget.body.x + this.selectedTarget.newSizeX) < (this.body.x - this.permanentHitArea[1]) ){
					this.move("l");
				}else if( (this.selectedTarget.body.x) <= (this.body.x - this.permanentHitArea[1] + this.permanentHitArea[2]) && this.flipX ){
					
					this.flipX = false;
					
					var randInt = Math.floor(Math.random() * 10);
					
					if(randInt >= 8){
						
						this.startHit( "normal");
						
					}else if( randInt < 8 && randInt >= 5 ){
						
						this.startHit( "running");
						
					}else{
						
						this.startHit( "super");
						
					}
					
				}else if( (this.selectedTarget.body.x + this.selectedTarget.newSizeX) >= (this.body.x + this.permanentHitArea[0]) && !(this.flipX) ){
					
					this.flipX = true;
					
					var randInt = Math.floor(Math.random() * 10);
					
					if(randInt >= 8){
						
						this.startHit( "normal");
						
					}else if(randInt < 8 && randInt >= 5){
						
						this.startHit( "running");
						
					}else{
						
						this.startHit( "super");
						
					}
					
				}else{
					
					var randInt = Math.floor(Math.random() * 10);
					
					if(randInt >= 8){
						
						this.startHit( "normal");
						
					}else if(randInt < 8 && randInt >= 5){
						
						this.startHit( "running");
						
					}else{
						
						this.startHit( "super");
						
					}
					
				}
				
			}
			
		}else{
			this.move("s");
		}
		
		if(this.body.touching.down){
			
			if(this.holdJumpHit){
				
				this.body.setGravityY(100);
				this.body.bounce.set(0.2);
				
				this.registerHit(this, this.superAttackStrength, this.superKnockBack); //register a hit in 10 milliseconds
	
				this.holdJumpHit = false;
				
				var proceedAttacking = setTimeout( this.allowAttack, this.resetTime, this); //have galdiator hold the hit for one second
				
				var reset = setTimeout( this.resetHitArea, this.resetTime, this); //reset the hit area after a certain amount of time
			
			}
			
		}
		
	}

	allowAttack(config){ //allows gladiator to attack again 
		
		config.canAttack = true;

	};

	registerHit(sprite , hitStrength, knockBack){ //tells the gladiator to look for a target and register a hit 

		//is mostly identical to the registerHit function for the Warrior.js class
	  for(var j = 0; j < sprite.targets.length; j++){
		
		for(var i = 0; i < sprite.targets[j].getChildren().length; i++) {
			var enemy = sprite.targets[j].getChildren()[i];
			
			if(sprite.flipX){
				
				var gladiatorRect = new Phaser.Geom.Rectangle(sprite.body.x + sprite.hitArea[0], sprite.body.y + sprite.newSizeY * 0.5, sprite.hitArea[2], sprite.newSizeY * 0.5);
				var targetRect = new Phaser.Geom.Rectangle(enemy.body.x, enemy.body.y , enemy.newSizeX, enemy.newSizeY);
				
				//only difference from Warrior.js class function is this one does not require the space key to be down
				if (Phaser.Geom.Intersects.RectangleToRectangle(gladiatorRect, targetRect) && (!sprite.getHitLeft && !sprite.getHitRight)){
					
					
					if( (sprite.body.x + sprite.permanentHitArea[0]) > (enemy.body.x + enemy.newSizeX*.5) ){
						enemy.getsHit("r", hitStrength, knockBack); //register a hit left for the archer
						
						//window.alert(config.hitArea[2]);
					}else{
						enemy.getsHit("l", hitStrength, knockBack); //register a hit left for the archerd
					}
					
				}
			}else{
				
				var gladiatorRect1 = new Phaser.Geom.Rectangle(sprite.body.x - sprite.hitArea[1], sprite.body.y + sprite.newSizeY * 0.5, sprite.hitArea[2], sprite.newSizeY * 0.5);
				var targetRect1 = new Phaser.Geom.Rectangle(enemy.body.x, enemy.body.y, enemy.newSizeX, enemy.newSizeY);
				
				if ( Phaser.Geom.Intersects.RectangleToRectangle(gladiatorRect1, targetRect1) && (!sprite.getHitLeft && !sprite.getHitRight)){
					
					
					if( (sprite.body.x - sprite.permanentHitArea[1] + sprite.permanentHitArea[2]) < (enemy.body.x + enemy.newSizeX*.5) ){
						
						enemy.getsHit("l", hitStrength, knockBack); //register a hit left for the archer
							
					}else{
						
						enemy.getsHit("r", hitStrength, knockBack); //register a hit left for the archer
						
						//window.alert(config.hitArea[2] + ", " + config.hitArea[1] + " ," + config.newSizeX);
						
					}
					
				}
			}
			
		}
      }
		
	};
	
	startJumpHit(config){
		
		if(!config.getHitLeft && !config.getHitRight){
			
			config.holdJumpHit = true;
		
			config.move("jh");
			
		}
	}
	
	//this function runs the necessary actions for the sprite to enact a normal, running, or super hit
	startHit(attack){
		
		if(attack == "normal"){
		
			this.move("hs");
			var hit = setTimeout( this.registerHit, this.registerHitSpeed, this, this.attackStrength, this.knockBack); //register a hit in 200 milliseconds
			
			this.canAttack = false;

			var proceedAttacking = setTimeout( this.allowAttack, this.resetTime, this); //have galdiator hold the hit for one second
		
		}else if(attack == "running"){
		
			if(this.flipX){
				
				this.move("hr");
			
			}else{
				
				this.move("hl");
				
			}
			
			var hit = setTimeout( this.registerHit, this.registerHitSpeed, this, this.attackStrength, this.knockBack); //register a hit in 200 milliseconds
			
			this.canAttack = false;

			var proceedAttacking = setTimeout( this.allowAttack, this.resetTime, this); //have galdiator hold the hit for one second
		
		}else if(attack == "super"){
			
			this.move("s");
			this.move("j");
			
			this.body.velocity.x = 0;
				
			var proceedAttacking = setTimeout( this.startJumpHit, 700, this); //run the jump hit function in 700 ms
			
			this.canAttack = false; //cant attack until this is declared true
				
			this.hitArea = [-this.newSizeX*1.5, this.newSizeX*1.5, this.newSizeX*4]; //set the boundaries larger for the hitarea of the gladiator
			
		}
		
	}
	
}


