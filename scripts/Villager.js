
class Villager extends Character{
	
	constructor(config){
		super(config);
		
		var randInt = Math.random(); 
		this.speed =  randInt*(this.speed / 4) + this.speed / 1.6; //set random speed
		
		this.jumpStrength = -this.scene.config.height*0.4;

		this.jumpStrength = randInt*(this.jumpStrength)*0.2 + this.jumpStrength;
		
		this.flipX = true;
		
		this.rescale = this.scene.config.height*0.0004; //set rescale value for the gladiator
		
		this.newSizeY = this.rescale*189;
		this.newSizeX = this.rescale*84;
		
		this.body.setSize(84, 189, true); //adjust the size of the hitbox
		this.body.setOffset(14,7);
		
		this.setScale(this.rescale); //use the config variable from the scene 
		this.isCelebrating = config.celebrate;
		
		this.move("s");
		
	}
	
	
	preUpdate(time, delta){ //this is the update function
		super.preUpdate(time, delta); //init update function
		
		if(this.isCelebrating && this.body.touching.down){
			
			this.move("j");
			//window.alert("yams");
			
		}
		else if(this.body.touching.down && (this.body.x > this.scene.config.height * 0.28) )
		{
			this.move("l");
		}
		else if(this.body.touching.down)
		{
			this.move("r");
		}
		
		//the sprite is destroyed lust before it leaved the scene. The sprite will be be able to hit the edge of the scene because all characters   
		//have setWorldCollide to be true
		
		if( (this.body.x > this.scene.config.width*0.1) && (this.body.x < this.scene.config.width*0.3) ){
			
			this.destroy();
			
		}
		
	}
	
	
	move(dir){ //allows the sprite to move (r=right, l=left, s=stop, j=jump, lo=load, f=fire)
		
		if(dir == "r"){ 
			
			this.body.velocity.x = this.speed;
		    this.anims.play('villager_forward', true);
			this.flipX = true;
			
		}else if(dir == "l"){
			
			this.body.velocity.x = -this.speed;
		    this.anims.play('villager_forward', true);
			this.flipX = false;
			
		}else if(dir == "s"){
			
			this.body.velocity.x = 0;
		    this.anims.play('villager_stop', true);
			
		}else if(dir == "j"){
			
			this.body.velocity.x = 0;
			this.body.velocity.y = this.jumpStrength;
		    this.anims.play('villager_stop', true);
			
		}
		
		
	};
	
}