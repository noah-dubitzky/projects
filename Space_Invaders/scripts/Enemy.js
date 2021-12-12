class Enemy extends Character { //extend from the sprite class
    constructor(config) {
        super(config); //variables for the gladiator
		
		var enemy = this;
		
		this.type = "enemy";
		
		this.side = "bad";
	
		this.fire; //interval event
		this.die;  //timeout event
		
		this.startDeathCount = true;
		this.deathTime = 3500;
		
		this.xAddH = 0;
		this.yAddH = 0;
		
		this.health = 7;
		
		this.homing = false;
	
		this.laser = [];
		this.laserSpeed = this.scene.width / 2;
		this.laserRate = 1500;
		this.laserOffsets = [
		
			[2,2]
			
		];
		
		this.speed = this.scene.width/4;
		
		this.AddToGroup(this.scene.enemies);
		
	}
	
	preUpdate(time, delta){
		
		super.preUpdate(time, delta); //init update function
		
		if(this.homing){
			
			this.IsHoming(this.scene.ship);
			
			if(this.startDeathCount)
			{
				this.die = this.setTimeoutScene(this.Explode, this.deathTime, this);
			    this.startDeathCount = false;
			}
		}
		
		if( this.y > this.scene.height )
		{
			this.isDead = true;
			this.clearInterval(this.fire);
			this.clearTimeout(this.die);
			this.destroy();
			return;
			
		}
	
	};
	
	resetFire(sprite)
	{
		
		sprite.canFire = true;
		
	}
	
	Explode(config)
	{
		
		var explosion = new Explosion(config.scene, config.x, config.y, 1.7 );
		
		config.isDead = true;
		
		config.clearInterval(config.fire);
		config.clearTimeout(config.die);
			
	    config.destroy(); //destroy the sprite
		
	}
	
	getsHit(scene, sprite, damage)
	{
		
		sprite.health -= damage;
		
		if(sprite.health < 0)
		{
			sprite.Explode(sprite)
		}
		
	}
	
	EnactFire(config, rate)
	{
		
		config.fire = config.setIntervalScene(function(){  //indicates that the sprite is firing
			
			config.FireLasers(config);
			
		}, rate);
		
	}
	
	FireLasers(config)
	{
		if(!config.homing)
		{
			if(!config.isDead)
			{
				for(var i = 0; i < config.laserOffsets.length; i++)
				{
				   
				    var offset = config.laserOffsets[i];
					var x, y;
					
					if(offset[0] == 0){
					
						x = config.x;
							
					}else{
						
						var x = config.x + config.newSizeX / offset[0];
						
					}
				   
					var y = config.y + config.newSizeY / offset[1];
					
					config.laser[i] = new Laser({scene: config.scene, x: x, y: y, side: config.side, speed: config.laserSpeed});
			
				}
			}
			
		}else{
			
			if(!config.isDead)
			{
				for(var i = 0; i < config.laserOffsets.length; i++)
				{
					
					var offset = config.configLaserPos(config, config.laserOffsets[i][0], config.laserOffsets[i][1]);
					
					var x = config.x + offset[0];
					var y = config.y + offset[1];
					
					config.laser[i] = new Laser({scene: config.scene, x: x, y: y, side: "evil"});
				
				    config.configLaserSpeed(config.laser[i]);
			
				}
			}
		}
	}
	
	IsHoming(sprite)
	{
		if(!sprite.isDead){
			
			this.adjacent = sprite.y - this.y;
			this.opposite = sprite.x - this.x;
			
			this.angle = (-1) * Math.atan(this.opposite/this.adjacent) * (180/Math.PI);
			
			if(this.adjacent < 0){
			
				this.angle -= 180;
				
			}
			
			this.angleM = this.angle * (Math.PI/180);
			
			this.body.velocity.y = this.speed * Math.cos(this.angleM);
			this.body.velocity.x = -this.speed * Math.sin(this.angleM);
			
			//this.body.velocity.y = 0;
			//this.body.velocity.x = 0;
			
			this.xAddH = -1 * Math.sin(this.angleM) * (this.newSizeY/2);
		    this.yAddH = Math.cos(this.angleM) * (this.newSizeY/2);
			
			this.health_bar.angle = this.angle;
			
		}
		else
		{
			this.body.velocity.y = this.speed;
			this.body.velocity.x = 0;
			
			this.clearInterval(this.fire);
			
			this.health_bar.angle = 0;
			this.angle = 0;
			this.yAddH = this.newSizeY/2;
			this.xAddH = 0;
			
		}
	}
	
	configLaserSpeed(laser)
	{
		laser.angle = this.angle;
		laser.body.velocity.y = Math.cos(this.angleM) * laser.speed;
		laser.body.velocity.x = -1 * Math.sin(this.angleM) * laser.speed;
	}
	
	configLaserPos(sprite, offsetX, offsetY)
	{
		
		var length1;
		var length2;
		
		var length1 = sprite.newSizeY/offsetY;
		
		if(offsetX == 0){
			
			length2 = 0;
			
		}else{

			length2 = sprite.newSizeY/offsetX;
		
		}
		var opposite = Math.sin(sprite.angleM);
		var adjacent = Math.cos(sprite.angleM);
		
		//this.xAdd1 = Math.sin(this.angleM) * (length2) * this.fireDir - Math.cos(this.angleM) * (length1) * dir;
		//this.yAdd1 = Math.cos(this.angleM) * (length2) * dir + Math.sin(this.angleM) * (length1) * this.fireDir;
			
		//this.xAdd2 = Math.sin(this.angleM) * (length2) * this.fireDir + Math.cos(this.angleM) * (length1) * this.fireDir;
		//this.yAdd2 = Math.cos(this.angleM) * (length2) * dir - Math.sin(this.angleM) * (length1)  * dir;
		
		var xAdd1 = -1 * opposite * (length1) - adjacent * (length2);
		var yAdd1 = adjacent * (length1) - opposite * (length2);
		
		return [xAdd1, yAdd1];
		
	}
	
}



