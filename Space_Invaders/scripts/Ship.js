class Ship extends Character { //extend from the sprite class
    constructor(config) {
        super(config); //variables for the gladiator
		
		var ship = this;
		
		this.type = "ship";
		
		this.AddToGroup(this.scene.mainShip);
		
		this.body.setCollideWorldBounds(true);
		
		this.animationString = 'Space_Ship_Stay'; 
		
		this.configSize(130,130,130,130,0,0);
		
		this.move("s");
		
		this.canFire = true;
		this.canBomb = true;
		
		this.laserRate = 30;
		this.laserSpeed = this.scene.width * 1.5;
		
  		this.bombAgain;  //interval function
		this.fire;		//interval function
		this.revive;   //timeout function
		
		this.setHealth(50);
		this.lives = 5;
		
		this.setAmmo(400);
		
		//declare the keys used for the user input
		const { LEFT, RIGHT, UP, DOWN, SPACE, SHIFT, W, A, S, D } = Phaser.Input.Keyboard.KeyCodes;
		ship.keys = this.scene.input.keyboard.addKeys({
			left: LEFT,
			right: RIGHT,
			up: UP,
			down: DOWN,
			space: SPACE,
			shift: SHIFT,
			w: W,
			a: A,
			s: S,
			d: D,
		});
		
		
		ship.scene.input.keyboard.on('keyup_A', function (event) {
			 
			ship.move("slr");
		   
		});
			
		ship.scene.input.keyboard.on('keyup_D', function (event) {
			
			ship.move("slr");
			
		});
		
		ship.scene.input.keyboard.on('keyup_W', function (event) {
			 
			ship.move("sud");
		   
		});
			
		ship.scene.input.keyboard.on('keyup_S', function (event) {
			
			ship.move("sud");
			
		});
		
		ship.scene.input.keyboard.on('keydown_S', function (event) {
			
			ship.move("u");
			
		});
		
		/*
		this.scene.input.keyboard.on('keydown_SPACE', function (pointer) 
		{
			if(ship.canFire && ship.ammoCount >= 0)
			{
			
				ship.laser = new Laser({scene: ship.scene, x: ship.x, y: ship.y - ship.newSizeY * 0.5, side: "good"});
				ship.ammoCount--;
			
				ship.fire = setInterval(function(){
				
					ship.laser = new Laser({scene: ship.scene, x: ship.x, y: ship.y - ship.newSizeY * 0.5, side: "good"});
					ship.ammoCount--;
					
					if(ship.ammoCount < 0)
					{
						clearInterval(ship.fire);
					}
				
				}, 50)
				
			}

		});
		*/
		
		
	}
	
	resetFire(sprite)
	{
		
		sprite.canFire = true;
		
	}
	
	resetMissile(sprite)
	{
		
		sprite.canBomb = true;
		
	}
	
	SendMissile(sprite)
	{
		
		sprite.bomb = new Bomb({scene: sprite.scene, x: sprite.x, y: sprite.y - sprite.newSizeY, side: "left" });
		
	}
	
	
	
	getsHit(config, scene, damage)
	{
		config.health -= damage;
		
		if(config.lives == 0 && config.health <= 0)
		{
			config.DestroySelf(config, scene);
			
			$('body').append("<p class='alert'>Your score is "+scene.score+". Refresh the page to restart.</p>");
			
			return;
		}
		
		if(config.health <= 0)
		{
			
			config.health = config.origionalHealth;
			
			var explosion = new Explosion(config.scene, config.x, config.y, 1 );
		
			config.isDead = true;
			config.canFire = false;
			config.canBomb = false;
			config.clearTimeout(config.bombAgain);
			config.clearTimeout(config.fire);
			config.lives--;
			
			config.alpha = 0.5;
		
			config.y = scene.height - config.newSizeY;
			config.x = scene.width / 2;
		
			scene.mainShip.remove(config);
		
			config.revive = config.setTimeoutScene(function(){      //time function
		
				config.Reset(scene, config);
				config.alpha = 1;
			
			}, 3000);
			
		}
		
	}
	
	DestroySelf(config, scene)
	{
		var explosion = new Explosion(config.scene, config.x, config.y, 1 );
		
		config.isDead = true;
		config.canFire = false;
		config.canBomb = false;
		config.clearTimeout(config.bombAgain);
		config.clearTimeout(config.fire);
			
		config.alpha = 0;
		
		scene.mainShip.remove(config);
		
		config.clearTimeout(config.revive);
		
		config.destroy();
		
	}
	
	Reset(scene, config)
	{
		scene.mainShip.add(config);
		config.body.allowGravity = false;
		config.body.immovable = true;
		config.body.setCollideWorldBounds(true);
			
		config.isDead = false;
		config.canFire = true;
		config.canBomb = true;
	}
	
	
	preUpdate(time, delta){
		
		super.preUpdate(time, delta); //init update function
		
		var ship = this;
		
		if (this.keys.a.isDown){
			
			this.move("l");
			
		}else if(this.keys.d.isDown){
			
			this.move("r");
			
		}
		
		if(this.keys.w.isDown){
			
			this.move("u");
			
		}else if(this.keys.s.isDown){
			
			this.move("d");
			
		}
		
		if(this.keys.shift.isDown && this.canBomb && (this.scene.bombNum > 0) )
		{
			this.SendMissile(this);
			
			this.canBomb = false;
			
			this.bombAgain = this.setTimeoutScene(this.resetMissile, 1000, this);
			
			this.scene.decrementBombNum();
		}
		
		
		if(this.keys.space.isDown){
			
			if(ship.canFire && ship.ammoCount > 0)
			{
				this.canFire = false;
				
				ship.laser = new Laser({scene: ship.scene, x: ship.x, y: ship.y - ship.newSizeY * 0.5, side: "good"});
				ship.ammoCount--;
			
				ship.fire = ship.setIntervalScene(function(){                  
				
					ship.laser = new Laser({scene: ship.scene, x: ship.x, y: ship.y - ship.newSizeY * 0.5, side: "good", speed: ship.laserSpeed});
					ship.ammoCount--;
					
					if(ship.ammoCount == 0)
					{
						clearInterval(ship.fire);
						ship.canFire = true;
					}
				
				}, ship.laserRate);
				
			}
		}else{
			
			if(!ship.isDead){
				
				ship.canFire = true;
				clearInterval(ship.fire);
			
			}
			
		}
		
		
	};
	
  
}