class LoadingScene extends Phaser.Scene {
  constructor() {
    super("LoadingScene");
  }
  
  preload(){
	  
        this.load.spritesheet('Ball', 'assets/Ball_Image.png', { frameWidth: 75, frameHeight: 75 });
		this.load.spritesheet('SpaceShip', 'assets/SpaceShip.png', { frameWidth: 130, frameHeight: 130 });
		this.load.spritesheet('Laser', 'assets/Laser.png', { frameWidth: 21, frameHeight: 42 });
		this.load.spritesheet('Explosion', 'assets/Explosion.png', { frameWidth: 168, frameHeight: 168 });
		this.load.spritesheet('Missle', 'assets/Missile.png', { frameWidth: 52, frameHeight: 108 });
		this.load.spritesheet('Bomb', 'assets/Bomb.png', { frameWidth: 112, frameHeight: 112 });
		this.load.spritesheet('Enemy', 'assets/Enemy.png', { frameWidth: 171, frameHeight: 171 });
		this.load.spritesheet('Enemy_2', 'assets/Enemy_2.png', { frameWidth: 190, frameHeight: 200 });
		this.load.spritesheet('Enemy_3', 'assets/Enemy_3.png', { frameWidth: 150, frameHeight: 150 });
		this.load.spritesheet('health_bar', 'assets/Health_Bar_6.png', { frameWidth: 108, frameHeight: 16 });
		this.load.spritesheet('Ammo_Pack', 'assets/Ammo_Pack.png', { frameWidth: 93, frameHeight: 51 });
		this.load.spritesheet('Ammo_Count', 'assets/Ammo.png', { frameWidth: 310, frameHeight: 180 });
		
		this.load.image('Space', 'assets/Space_Background.jpg');
		this.load.image('Space1', 'assets/Space_Background2.jpg');
		this.load.image('SpaceShipPic', 'assets/SpaceShip.png');
		this.load.image('Enemy_Pic', 'assets/Enemy.png');
		this.load.image('Missle_Pic', 'assets/Missile.png');
		this.load.image('Bomb_Pic', 'assets/Bomb.png');
		this.load.image('Laser_Pic', 'assets/Laser.png');
  }
  

  create() {
	  
		this.anims.create({
			key: 'Ammo',
            frames: [ { key: 'Ammo_Pack', frame: 0 } ],
            frameRate: 20
        });
		
		this.anims.create({ 
            key: 'Ammo_Count',
            frames: this.anims.generateFrameNumbers('Ammo_Count', { start: 0, end: 5}),
            frameRate: 30, 
            repeat: -1,
			hideOnComplete: false
        });
	  
		this.anims.create({
			key: 'ball_stay',
            frames: [ { key: 'Ball', frame: 0 } ],
            frameRate: 20
        });
		
		
		this.anims.create({
			key: 'bomb_stay',
            frames: [ { key: 'Bomb', frame: 0 } ],
            frameRate: 20
        });
		
		this.anims.create({
			key: 'Space_Ship_Stay',
            frames: [ { key: 'SpaceShip', frame: 0 } ],
            frameRate: 20
        });
		
		this.anims.create({
			key: 'Laser_move',
            frames: [ { key: 'Laser', frame: 0 } ],
            frameRate: 20
        });
		
		this.anims.create({ 
            key: 'Explosion',
            frames: this.anims.generateFrameNumbers('Explosion', { start: 0, end: 3}),
            frameRate: 30, 
            repeat: -1,
			hideOnComplete: true
        });
		
		this.anims.create({
			key: 'Missle_Move',
            frames: [ { key: 'Missle', frame: 0 } ],
            frameRate: 20
        });
		
		this.anims.create({
			key: 'Enemy_Stop',
            frames: [ { key: 'Enemy', frame: 0 } ],
            frameRate: 20
        });
		
		this.anims.create({
			key: 'Enemy_2_Stop',
            frames: [ { key: 'Enemy_2', frame: 0 } ],
            frameRate: 20
        });
		
		this.anims.create({
			key: 'Enemy_3_Stop',
            frames: [ { key: 'Enemy_3', frame: 0 } ],
            frameRate: 20
        });
		
		this.anims.create({
			key: 'Dude_1_Stop',
            frames: [ { key: 'Enemy_Dude_1', frame: 0 } ],
            frameRate: 20
        });
		
		this.anims.create({
            key: 'health_0',
            frames: [ { key: 'health_bar', frame: 0 } ],
            frameRate: 20
        });
		
		this.anims.create({
            key: 'health_1',
            frames: [ { key: 'health_bar', frame: 1 } ],
            frameRate: 20
        });
		
		this.anims.create({
            key: 'health_2',
            frames: [ { key: 'health_bar', frame: 2 } ],
            frameRate: 20
        });
		
		this.anims.create({
            key: 'health_3',
            frames: [ { key: 'health_bar', frame: 3 } ],
            frameRate: 20
        });
		
		
		this.add.text(20, 20, "Loading game...");
        this.scene.start("FreePlay");
    
  };


}




