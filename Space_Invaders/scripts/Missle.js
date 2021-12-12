
class Missle extends Objects { //extend from the sprite class
    constructor(config) {
        super(config); //variables for the gladiator
		
		this.configScale = config.scene.width;
		
		this.scene = config.scene;
		
		this.homing = false;
		
		this.configSize(108, 52, 108, 52, 0, 0);
		
		this.animationString = 'Missle_Move';
		
		this.opposite;
		this.adjacent;
		this.angleM;
		
		this.die;
		
		this.scene.missles.add(this);
		
		this.body.allowGravity = false;
		this.body.bounce.set(0);
			
		this.body.immovable = true;
		
		this.damage = 5;
		
		this.move('d');
		
	}
	
	preUpdate(time, delta){
		
		super.preUpdate(time, delta); //init update function
		
		if(this.y > this.scene.height || this.y < -100)
		{	
			this.clearTimeout(this.die);
			this.destroy();
			return;
			
		}
		
		if(this.homing)
		{
			if(!this.scene.ship.isDead){
				this.EnableHoming();
			}else{
				this.body.velocity.y = this.speed;
				this.body.velocity.x = 0;
				this.angle = 0;
			}
		}		
	}
	
	EnableHoming()
	{
		this.adjacent = this.scene.ship.y - this.y;
		this.opposite = this.scene.ship.x - this.x;
		
		this.angle = (-1) * Math.atan(this.opposite/this.adjacent) * (180/Math.PI);
			
		if(this.adjacent <= 0){
				
			this.angle -= 180;
				
		}
			
		var angleM = Math.atan(this.opposite/this.adjacent);
			
		if(this.adjacent > 0)
		{
			this.body.velocity.y = this.speed * Math.cos(angleM);
			this.body.velocity.x = this.speed * Math.sin(angleM);
		}
		else
		{
			this.body.velocity.y = -this.speed * Math.cos(angleM);
			this.body.velocity.x = -this.speed * Math.sin(angleM);
		}
	}
	
	Explode(config){
		
		var explosion = new Explosion(config.scene, config.x, config.y, 1 );
		
		if(config.homing){
			
			config.clearTimeout(config.die);
			
		}
		config.destroy();
		
	}
	
  
}