class Ball extends Phaser.GameObjects.Sprite { //extend from the sprite class
    constructor(config) {
        super(config.scene, config.x, config.y, "ball"); //variables for the gladiator
		
		var ball = this;
		
		config.scene.Balls.add(this); //add the sprite the main Players group
		
		this.scene = config.scene;

		this.velocityX = 1200; //the velocity and trajectory of the arrow
		this.velocityY = 1200; //the velocity and trajectory of the arrow
		
		config.scene.add.existing(this); //add the sprite to the scene
		config.scene.physics.world.enableBody(this); //give it physics
		
		this.body.allowGravity = false;
		
		this.body.setCircle(37.5);
		
		//this.body.setSize(75, 75, true); //adjust the size of the hitbox
		//this.body.setOffset(25,25); //adjust the position of the hitbox
		this.body.bounce.set(1);
		
		this.setScale(config.scene.width / 2500); 
	
		this.body.velocity.x = -500;  
        this.body.velocity.y = -500;  			
		this.anims.play('ball_stay', true);
		
	}
	
	preUpdate(time, delta){
		
		super.preUpdate(time, delta); //init update function
		
		/*
		if(this.body.x > this.scene.config.width || this.body.x < 0){
			
			this.destroy();
			
		}
		*/
		
	};
	
  
}