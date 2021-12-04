//class for gladiator with keyboard inputs

class Warrior extends Character { //extend from the sprite class
    constructor(config) {
        super(config); //variables for the gladiator
		
		this.type = "warrior";
		
		this.canAttack = true; //allows attack, prevents multiple attacks from happening at once, prevents spam attacking 
		this.spaceUp = true; //indicates that the space bar is up so that the sprite can attack again
		
		this.holdJumpHit = false; //indicates if the sprite is holding a "hit jump"
	
		this.attackStrength; //declare attack strength
		this.superAttackStrength; //declare super attack strength
		
		this.knockBack = this.scene.config.width / 4.5; //how far the sprite knocks back its target when hit
		this.superKnockBack = this.knockBack * 1.3; //how far the sprite knocks back its target when hit
		
		this.hitArea = []; //defines the area of the hit radius, takes 3 integers
		this.permanentHitArea = []; //even when the hit area of a sprite changes, this keeps the origional hit area parameters
		this.superHitArea = []; //define the hit area that is larger, for a super attack
		
		this.targets = []; //holds all of the targets of the warrior
		
		this.registerHitSpeed = 200; //declare the speed at which 
		
		this.superHit = true; //indicate when the sprite can perform a super hit
		
		this.attackCoolDown; //holds the timeout function for reseting the can attack variable to true 
		
		
    };
	
	allowAttack(config){ //allows gladiator to attack again
		
		if(!config.getHitLeft && !config.getHitRight ){
			
			config.canAttack = true;
			
		}

	};
  
	resetHitArea(config){ //reset the hit area of the sprite
		
		config.hitArea = [config.permanentHitArea[0], config.permanentHitArea[1], config.permanentHitArea[2] ]; //reset the hitarea of the sprite
		
	}

	registerHit(sprite , hitStrength, knockBack){ //tells the gladiator to look for a target and register a hit 

	  for(var j = 0; j < sprite.targets.length; j++){
		
		//filter through all the enemies of the sprite
		for(var i = 0; i < sprite.targets[j].getChildren().length; i++) {
			var enemy = sprite.targets[j].getChildren()[i]; //sprite is the name of the enemy
		
			//have two scenerios for the direction the sprite is facing 
			if(sprite.flipX){
				
				//create two rects, one of the hit area for the sprite, and one for the hitbox of the enemy
				var gladiatorRect = new Phaser.Geom.Rectangle(sprite.body.x + sprite.hitArea[0], sprite.body.y + sprite.newSizeY * 0.5, sprite.hitArea[2], sprite.newSizeY * 0.5);
				var targetRect = new Phaser.Geom.Rectangle(enemy.body.x, enemy.body.y , enemy.newSizeX, enemy.newSizeY);
				
				//if the rects intersect (and if the space key is still down, and if the sprite is not being hit), then asses where the enemy is in relation to the sprite
				if (Phaser.Geom.Intersects.RectangleToRectangle(gladiatorRect, targetRect) && sprite.keys.space.isDown && (!sprite.getHitLeft && !sprite.getHitRight)){
					
					//if the center of the enemy is to the left of the sprite's hit area
					if( (sprite.body.x + sprite.permanentHitArea[0]) > (enemy.body.x + enemy.newSizeX*.5) ){
						
						enemy.getsHit("r", hitStrength, knockBack); //register a hit left for the enemy
						
					}else{
						
						enemy.getsHit("l", hitStrength, knockBack); //register a hit left for the enemy
						
					}
					
				}
			}else{
				
				//identical to the last boolean statement, except the hit area is on the other side of the sprite 
				
				var gladiatorRect1 = new Phaser.Geom.Rectangle(sprite.body.x - sprite.hitArea[1], sprite.body.y + sprite.newSizeY * 0.5, sprite.hitArea[2], sprite.newSizeY * 0.5);
				var targetRect1 = new Phaser.Geom.Rectangle(enemy.body.x, enemy.body.y, enemy.newSizeX, enemy.newSizeY);
				
				if ( Phaser.Geom.Intersects.RectangleToRectangle(gladiatorRect1, targetRect1) && sprite.keys.space.isDown && (!sprite.getHitLeft && !sprite.getHitRight)){
					
					//if the center of the enemy is to the left of the sprite's hit area 
					if( (sprite.body.x - sprite.permanentHitArea[1] + sprite.permanentHitArea[2]) < (enemy.body.x + enemy.newSizeX*0.5) ){
						
						enemy.getsHit("l", hitStrength, knockBack); //register a hit left for the archer
							
					}else{
						
						enemy.getsHit("r", hitStrength, knockBack); //register a hit left for the archer
						
					}
					
				}
			}
		
		
		}
      }
		
	};

}




