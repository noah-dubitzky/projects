
class HealthBar extends Phaser.GameObjects.Sprite{
	
	constructor(config){
		super(config.scene, config.x, config.y, "HealthBar"); //variables for the gladiator
		
		config.scene.add.existing(this); //add the sprite to the scene
		config.scene.physics.world.enableBody(this); //give it physics
		
		this.sprite = config.sprite; //allow for a global variable 
		this.origionalHealth = this.sprite.health; //save the origional health of sprite as a reference 
		
		this.anims.play('health_0', true);
		
		this.body.allowGravity = false;
		
		this.setScale(this.sprite.rescale);
		
	}
	
	preUpdate(time, delta){ //this is the update function
	
		super.preUpdate(time, delta); //init update function
		
		if( !(this.sprite.isDead) ){
			
			if(this.sprite.flipX){
				
				this.originX = 0.5 + this.sprite.anchorOffset; //set the origion of the health bar 
				
			}else{
				
				this.originX = 0.5 - this.sprite.anchorOffset; //set the origion of the health bar 
				
			}
			
			this.y = this.sprite.body.y - this.sprite.newSizeY*.1; //set the health bar to hover a bit 
			this.x = this.sprite.x;
			
			
			//reset the status of the health bar to display how much health the sprite has
			if(this.sprite.health <= Math.floor( this.origionalHealth ) && this.sprite.health > Math.floor( this.origionalHealth*.75 ) ){
				
				//if the current health is between 100% and 75% of the origional health 
				this.anims.play('health_0', true);
				
			}else if(this.sprite.health <= Math.floor( this.origionalHealth*.75 ) && this.sprite.health > Math.floor( this.origionalHealth*.5 )){
				
				//if the current health is between 75% and 50% of the origional health 
				this.anims.play('health_1', true);
				
			}else if(this.sprite.health <= Math.floor( this.origionalHealth*.5 ) && this.sprite.health > Math.floor( this.origionalHealth*.25 )){
				
				//if the current health is between 25% and 0% of the origional health 
				this.anims.play('health_2', true);
				
			}else{
				
				this.anims.play('health_3', true);
				
			}
			
		}
		
		//destroy the health bar if the sprite is dead
		if(this.sprite.isDead){
			
			this.destroy();
		}
	}
}