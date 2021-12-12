class Explosion extends Phaser.GameObjects.Sprite { //extend from the sprite class
    constructor(scene, x, y, size) {
        super(scene, x, y, "explosion"); //variables for the gladiator
		
		scene.add.existing(this); //add the sprite to the scene
		
		var config = this;
		
		//this.rescale = scene.width / size; //set the scale of the sprite based off the size of the window
		this.rescale = scene.scale * size; //set the scale of the sprite based off the size of the window
		this.setScale(this.rescale);
		
		this.setOrigin(0.5, 0.5);
		
		this.anims.play('Explosion', false);
		
		var set = setTimeout(function(){ //destroy the sprite in 300 ms
			
			config.destroy(); //destroy the sprite
				
		}, 90);
		
	}
  
}