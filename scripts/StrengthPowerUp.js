
class StrengthPowerUp extends Phaser.GameObjects.Sprite{
	
	constructor(config){
		super(config.scene, config.x, config.y, "StrengthPowerUp"); //variables for the gladiator
		
		config.scene.add.existing(this); //add the sprite to the scene
		config.scene.physics.world.enableBody(this); //give it physics
		
		this.scene.StrengthPowerUps.add(this); //add the gladiator to the "gladiatorMPCs" group
		
		this.anims.play('StrengthPowerUp', true);
		
		this.body.allowGravity = true;
		
		this.body.setSize(50, 50, true); //adjust the size of the hitbox
		this.body.setOffset(0,10); //adjust the position of the hitbox
		
		this.setScale(this.scene.config.height*0.0006);
	}
	
	enactSuperHit(sprite){
		
		sprite.jumpStrength = sprite.jumpStrength + sprite.jumpStrength*0.3;
		
		sprite.attackStrength = sprite.attackStrength + sprite.attackStrength*0.3;
		
		sprite.superAttackStrength = sprite.superAttackStrength + sprite.superAttackStrength*0.2;
	
		sprite.speed = sprite.speed*0.3 + sprite.speed;
		
		this.destroy();
		
	}
	
	enactSuperArrow(sprite){
		
		sprite.jumpStrength = sprite.jumpStrength + sprite.jumpStrength*0.3;
	
		sprite.speed = sprite.speed*0.5 + sprite.speed;
		
		sprite.arrowAttack = sprite.arrowAttack*1.5;
		
		sprite.loadSpeed = sprite.loadSpeed*0.75;
		
		this.destroy();
		
	}
	
}










