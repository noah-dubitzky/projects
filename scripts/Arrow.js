class Arrow extends Phaser.GameObjects.Sprite { //extend from the sprite class
    constructor(config) {
        super(config.scene, config.x, config.y, "arrow"); //variables for the gladiator
		
		var arrow = this;
		
		this.scene = config.scene;

		this.velocity = this.scene.config.width * 0.8; //the velocity and trajectory of the arrow
		this.traj = -1 * (this.scene.config.width / 10);
		
		this.knockBack = this.scene.config.width / 5;
		
		this.damage = config.strength;
		
		config.scene.add.existing(this); //add the sprite to the scene
		config.scene.physics.world.enableBody(this); //give it physics
		
		this.body.setSize(10, 10, true); //adjust the size of the hitbox
		
		this.setScale(config.scale*0.55); 
		
		if(config.team == "good"){
			
			config.scene.goodArrow.add(this);
			
		}else{
			
			config.scene.badArrow.add(this);
			
		}
		
		if(config.flipX){
		    this.body.velocity.x = this.velocity;  
            this.body.velocity.y = this.traj;  			
		    this.anims.play('arrow_move', true);
			this.flipX = config.flipX;
		}else{
			this.body.velocity.x = -1*this.velocity;  
            this.body.velocity.y = this.traj;  			
		    this.anims.play('arrow_move', true);
			this.flipX = config.flipX;
		}
		
	}
	
	preUpdate(time, delta){
		
		super.preUpdate(time, delta); //init update function
		
		if(this.body.x > this.scene.config.width || this.body.x < 0){
			
			this.destroy();
			
		}
		
		
	};
	
  
}