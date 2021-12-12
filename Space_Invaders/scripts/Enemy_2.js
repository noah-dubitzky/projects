class Enemy_2 extends Enemy { //extend from the sprite class
    constructor(config) {
        super(config); //variables for the gladiator
	
		this.animationString = 'Enemy_2_Stop';  //this line is specific
		
		this.move('d');
		
		var enemy = this;
		
		this.laserRate = 2300;
		
		this.configScale = config.scene.width;
		
		this.configSize(190, 200, 190, 200, 0, 0);
		
		this.laserOffsets = [
		
			[2.4,2],
			[-2.4,2]
			
		];
		
		this.EnactFire(this, this.laserRate);
		
	}
  
}