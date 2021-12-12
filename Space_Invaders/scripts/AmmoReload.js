class AmmoReload extends Objects { //extend from the sprite class
    constructor(config) {
        super(config); //variables for the gladiator
		
		this.configSize(51, 93, 51, 93, 0, 0);
		this.AddToGroup(this.scene.PowerUps);
		
		this.anims.play("Ammo", true);
	    this.anims.pause(this.anims.currentAnim.frames[0]);
		
		this.ammoBoost = 400;
		
	}
	
	PowerUp(sprite)
	{
		
		sprite.setAmmo(this.ammoBoost);
		
		this.destroy();
		
	}
  
}