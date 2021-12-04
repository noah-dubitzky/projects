

class Helper extends ArcherMPC { //extend from the sprite class
    constructor(config) {
        super(config); //variables for the gladiator
		
		this.scene = config.scene;
		
		config.scene.enemyNPCs.remove(this); // remove the helper from the archerMPCs group
		config.scene.helpers.add(this); //add the sprite to the helper class
		//config.scene.mainPlayers.add(this); //add the sprite to the helper class
		
		//adjust the size, scale, and hitbox of the sprite
		this.rescale = this.scene.config.height*0.0005; //set the scale of the sprite based off the size of the window
		this.newSizeY = this.rescale*116;
		this.newSizeX = this.rescale*68;
		this.body.setSize(68, 116, true); //adjust the size of the hitbox
		this.body.setOffset(16,0); //adjust the position of the hitbox
		
		this.setScale(this.rescale); //adjust scale
		
		this.team = "good";
		this.targetIndex = 0;
		
		this.health = 8;
		
		this.arrowAttack = 2;
		
		this.loadSpeed = 500;
		
		this.attackDistance += this.scene.config.width*0.1;
		
		this.targets = [config.scene.enemyNPCs];
		this.selectedTarget = this.targets[0].getChildren()[0];
		
		
    };
	
	preUpdate(time, delta){ //this is the update function
		super.preUpdate(time, delta); //init update function
		
		if( this.targets[0].getChildren().length > 0){
				
			//if the targets array has a list of enemies in it, then update the selected target of the helper. everytime the first enemy in the targets[0] list is destroyed, 
			//a new sprite will be put into the first spot and the variable this.selectedTarget will have to be updated
			this.selectedTarget = this.targets[0].getChildren()[0];
				
		}
			
		if(this.scene.playerOneIsDead){
			
			this.selectedTarget = null;
			
		}
		
	}
	
	
	move(dir){ //allows the sprite to move (r=right, l=left, s=stop, j=jump, lo=load, f=fire)
		
		if(dir == "r"){ 
			
			this.body.velocity.x = this.speed;
		    this.anims.play('helper_MPC_forward', true);
			this.flipX = true;
			
		}else if(dir == "l"){
			
			this.body.velocity.x = -this.speed;
		    this.anims.play('helper_MPC_forward', true);
			this.flipX = false;
			
		}else if(dir == "s"){
			
			this.body.velocity.x = 0;
		    this.anims.play('helper_MPC_stop', true);
			
		}else if(dir == "j"){
			
			this.body.velocity.x = 0;
			this.body.velocity.y = this.jump;
			
		}else if(dir == "lo"){
			
			this.body.velocity.x = 0;
		    this.anims.play('helper_MPC_load', true);
			
		}else if(dir == "f"){
			
			this.body.velocity.x = 0;
		    this.anims.play('helper_MPC_fire', true);
			
		}
		
	}
}