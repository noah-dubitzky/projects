
class Laser extends Objects { //extend from the sprite class
    constructor(config) {
        super(config); //variables for the gladiator
		
		this.side = config.side;
		
		this.configScale = config.scene.width;
		
		this.speed = this.scene.width;
		
		if(config.speed > 0)
		{
			this.speed = config.speed;
		}
		
		this.animationString = 'Laser_move';
		
		this.damage = 1;
		
		if(config.side == "good")
		{
			this.AddToGroup(this.scene.lasers ); //add the sprite the main Players group
			
			this.move("u");
			
		}else{
			
			this.AddToGroup(this.scene.evilLaser ); //add the sprite the main Players group
			
			this.move("d");
			
		}
		
		this.configSize(54, 27, 54, 27, 0, 0);

		
		/*
		this.side = config.side;
		
		this.speed = (this.configScale / 1.5);
		
		this.animationString = 'Laser_move';
		
		if(config.side == "good")
		{
			this.AddToGroup( this.scene.lasers ); //add the sprite the main Players group
			
			this.move("u");
			
		}else{
			
			this.AddToGroup( this.scene.evilLaser );//add the sprite the main Players group
			
			this.move("d");
			
		}
		
		this.configSize(54, 27, 54, 27, 0, 0
		*/
	}
	
	preUpdate(time, delta){
		
		super.preUpdate(time, delta); //init update function
		
		if(this.body.y > this.scene.height || this.body.y < -100)
		{
			this.destroy();
			
		}
		
	}
	
	Explode(config){
		
		config.destroy();
		
	}
	
	
  
}