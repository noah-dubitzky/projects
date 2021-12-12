class HomingMissile extends Missle { //extend from the sprite class
    constructor(config) {
        super(config); //variables for the gladiator
		
		this.angle = 0;
		
		this.speed = (this.configScale / 2.5);
		
		this.move('d');
		
		this.velX;
		this.velY;
		this.ratio;
		
		this.type = "missile";
		
		this.opposite;
		this.adjacent;
		this.angleM;
		
		this.die = this.setTimeoutScene(this.Explode, 3400, this);
		 
		this.homing = true;
		
		this.damage = 3;
		 
	}
	
  
}



