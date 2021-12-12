class Character extends Objects { //extend from the sprite class
    constructor(config) {
        super(config); //variables for the gladiator
		
		
		this.isDead = false; //cs
		
		this.type = "character";
		
		//cs
		this.health = 10;
		this.origionalHealth = this.health;
		this.isDead = false;
		
		//character specific
		this.anchorOffset = 0;
		this.health_bar = new HealthBar({scene: this.scene, x: (this.x), y: (this.y), sprite: this}); //set up the health bar for the sprite
		
		
	}
	
	setHealth(x)
	{
		this.health = x;
		this.origionalHealth = x;
	}
	
	setAmmo(x)
	{
		this.ammoCount = x;
		this.ammoOriginal = x;	
	}
	
}



