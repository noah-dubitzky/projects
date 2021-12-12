class Enemy_1 extends Enemy { //extend from the sprite class
    constructor(config) {
        super(config); //variables for the gladiator
	
		this.animationString = 'Enemy_Stop';  //this line is specific
		
		this.move('d');
		
		var enemy = this;
		
		this.laserRate = 1700;
		
		this.configScale = config.scene.width;
		
		this.configSize(171, 171, 171, 171, 0, 0);
		
		this.laserOffsets = [
		
			[0,2]
			
		];
		
		this.EnactFire(this, this.laserRate);
		
		
	}
  
}