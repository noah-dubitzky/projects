//this is the archerMPC class that creates a computer controled archer
class AxeThrowerMPC extends ArcherMPC{
	
	constructor(config){
		super(config)
		
		this.rescale = this.scene.config.height*0.00075; //set rescale value for the gladiator
		this.newSizeY = this.rescale*100;
		this.newSizeX = this.rescale*72;
		
		this.body.setSize(72, 100, true); //adjust the size of the hitbox
		this.body.setOffset(14,0);
		
		this.setScale(this.rescale); //use the config variable from the scene 
		
		this.name = "axe"
		
	}
	
	
	ArrowFire(config){ 
	
	   //make the arrow fire from the exact hand position of the sprite
	   var archerHandX = this.body.x;
	
	   if(this.flipX){
		   
		   archerHandX += this.newSizeX; 
		   
	   }
	  
      //create instance of arrow	  
	  var axe = new Axe({scene: config.scene, x: archerHandX, y: this.body.y + this.rescale*50, scale: this.rescale*2, flipX: this.flipX, team: this.team, strength: this.arrowAttack});      
		  
	  this.arrowLoaded = false; //no arrow is loaded so this variable is false
		  
	  this.canFire = false; //the archer cannot fire 
		  
	  setTimeout(this.AllowFire, this.loadSpeed, this); //allow archer to be able to fire after one second
		
	};
	
	move(dir){ //allows the sprite to move (r=right, l=left, s=stop, j=jump, lo=load, f=fire)
		
		if(dir == "r"){ 
			
			this.body.velocity.x = this.speed;
		    this.anims.play('axe_thrower_forward', true);
			this.flipX = true;
			
		}else if(dir == "l"){
			
			this.body.velocity.x = -this.speed;
		    this.anims.play('axe_thrower_forward', true);
			this.flipX = false;
			
		}else if(dir == "s"){
			
			this.body.velocity.x = 0;
		    this.anims.play('axe_thrower_stop', true);
			
		}else if(dir == "j"){
			
			this.body.velocity.x = 0;
			this.body.velocity.y = this.jump;
			
		}else if(dir == "lo"){
			
			this.body.velocity.x = 0;
		    this.anims.play('axe_thrower_load', true);
			
		}else if(dir == "f"){
			
			this.body.velocity.x = 0;
		    this.anims.play('axe_thrower_fire', true);
			
		}
		
		
	};
	
}