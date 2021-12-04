

class Archer extends Character { //extend from the sprite class
    constructor(config) {
        super(config); //variables for the gladiator
		
		this.type = "archer";
		
		var archer = this; //use this variable to extend the scope of the class
		this.scene = config.scene; //use variable to create local scope of config.scene
		
		this.arrowLoaded = false;  //variable that allows for arrow to load
		this.canFire = true;  //variable that allows archer to fire
		
		//this.speed = 100;
		//this.jumpStrength = -330;
		
		this.arrowAttack;
		
		this.team = "good";
		
		this.loadSpeed = 1000;
		
		this.resetFire; //this is the variable that stores the timeOut that resets the canFire variable after the archer fires so that it can fire again
		
    };
	
	//fire an arrow for the sprite
	ArrowFire(config){ 
	
	   //make the arrow fire from the exact hand position of the sprite
	   var archerHandX = this.body.x;
	
	   if(this.flipX){
		   
		   archerHandX += this.newSizeX; 
		   
	   }
	  
	  //an arrow can only be fired if the arrowLoaded variable is set to true
	  if(this.arrowLoaded){
		  
		 var archer = this; 
		//create instance of arrow only if the sprite is not dead
		if(!this.isDead){
	
			var arrow = new Arrow({scene: config.scene, x: archerHandX, y: archer.body.y + archer.rescale*50, scale: archer.rescale*2, flipX: archer.flipX, team: archer.team, strength: archer.arrowAttack});  
			    
		}
	  
		this.arrowLoaded = false; //no arrow is loaded so this variable is false
		  
		this.canFire = false; //the archer cannot fire 
		  
		this.resetFire = setTimeout(this.AllowFire, this.loadSpeed, this); //allow archer to be able to fire after a certain amount of time
		
	  }
	};

	//allow for arrow to fire
	AllowFire(sprite){
		
		sprite.canFire = true; //allow the archer to fire
		
	};
	
}

