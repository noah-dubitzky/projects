class Enemy_3 extends Enemy { //extend from the sprite class
    constructor(config) {
        super(config); //variables for the gladiator
	
		this.animationString = 'Enemy_3_Stop';  //this line is specific
		
		this.move('d');
		
		var enemy = this;
		
		this.configScale = config.scene.width;
		
		this.configSize(150, 150, 150, 150, 0, 0);
		
		this.speed = (this.configScale / 3);
		
		this.homing = true; //tells the sprite that it is homing 
		this.laserOffsets = [
		
			[2.4,2],
			[-2.4,2]
			
		];
		
		this.EnactFire(this, this.laserRate); //tells the sprite to fire lasers at the points specified by laserOffset
		
		//this.die = setTimeout(this.Explode, 3400, this);
		
		
	}
  
}








