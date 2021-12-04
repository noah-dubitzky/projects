class LoadingScene extends Phaser.Scene {
  constructor() {
    super("LoadingScene");
  }
  
  preload(){
	    this.load.image('tree2', 'assets/Tree_2.png');
		this.load.image('tree3', 'assets/Tree_3.png');
        this.load.image('background', 'assets/forest_background.png');
        this.load.image('brick', 'assets/brick.jpg');
		this.load.image('Villager', 'assets/sprites/Villager_2.png');
		this.load.image('Inv_Plate', 'assets/sprites/Invisible_Platform.png');
		this.load.image('House', 'assets/sprites/House.png');
		this.load.image('House2', 'assets/sprites/House2.png');
		this.load.image('House3', 'assets/sprites/House3.png');
		this.load.spritesheet('gladiator', 'assets/sprites/gladiator(24 frame)_2.png', { frameWidth: 100, frameHeight: 100 });
		this.load.spritesheet('StrengthPowerUp', 'assets/sprites/StrengthPowerUp.png', { frameWidth: 50, frameHeight: 50 });
		this.load.spritesheet('knight', 'assets/sprites/Knight_Pic_24_v3.png', { frameWidth: 108, frameHeight: 112 });
		this.load.spritesheet('golem', 'assets/sprites/Iron_Golem_8 (2).png', { frameWidth: 84, frameHeight: 84 });
		this.load.spritesheet('lumberjack', 'assets/sprites/Axe_Man(24_frame)_v2.png', { frameWidth: 100, frameHeight: 100 });
		this.load.spritesheet('health_bar', 'assets/sprites/Health_Bar_5.png', { frameWidth: 100, frameHeight: 16 });
		this.load.spritesheet('health_bar_108', 'assets/sprites/Health_Bar_6.png', { frameWidth: 108, frameHeight: 16 });
		this.load.spritesheet('archer', 'assets/sprites/archer_4.png', { frameWidth: 100, frameHeight: 116 });
		this.load.spritesheet('archer_MPC', 'assets/sprites/archer_MPC_4.png', { frameWidth: 100, frameHeight: 116 });
		this.load.spritesheet('helper_MPC', 'assets/sprites/helperMPC_5.png', { frameWidth: 100, frameHeight: 116 });
		this.load.spritesheet('axe_thrower', 'assets/sprites/AxeThrower_1.png', { frameWidth: 100, frameHeight: 100 });
		this.load.spritesheet('arrow', 'assets/sprites/arrow_1.png', { frameWidth: 75, frameHeight:  9});
		this.load.spritesheet('boulder', 'assets/sprites/boulder (1).png', { frameWidth: 200, frameHeight:  200});
		this.load.spritesheet('axe', 'assets/sprites/axe.png', { frameWidth: 68, frameHeight: 68});
		this.load.spritesheet('helper_player_scene', 'assets/sprites/helper_player_intro.png', { frameWidth: 800, frameHeight: 200});
		this.load.spritesheet('villager_sprite', 'assets/sprites/VillagerSprite.png', { frameWidth: 112, frameHeight: 196 });
  }

  create() {
	  
	  this.anims.create({
            key: 'StrengthPowerUp',
            frames: [ { key: 'StrengthPowerUp', frame: 0 } ],
            frameRate: 20
        });
	  
	    //gladiator animations///////////////////////////////////////////////////////
	    this.anims.create({
            key: 'gladiator_stop',
            frames: [ { key: 'gladiator', frame: 11 } ],
            frameRate: 20
        });
		
	    this.anims.create({ 
            key: 'gladiator_forward',
            frames: this.anims.generateFrameNumbers('gladiator', { start: 8, end: 15}),
            frameRate: 10, 
            repeat: -1
        });

		this.anims.create({
            key: 'gladiator_attack', 
            frames: this.anims.generateFrameNumbers('gladiator', { start: 0, end:  6}),
            frameRate: 12,
            repeat: 0
        });

		this.anims.create({
            key: 'gladiator_hit_short', 
            frames: this.anims.generateFrameNumbers('gladiator', { start: 0, end:  3}),
            frameRate: 25,
            repeat: 0
        });
		
		this.anims.create({
            key: 'gladiator_attack_forward',
            frames: this.anims.generateFrameNumbers('gladiator', { start: 16, end:  19}),
            frameRate: 25,
            repeat: 0
        });
		
		this.anims.create({
            key: 'gladiator_jump_attack',
            frames: [ { key: 'gladiator', frame: 3 } ],
            frameRate: 20
        });
		
		
		//archer animations///////////////////////////////////////////////////////////
		this.anims.create({
            key: 'archer_forward',
            frames: this.anims.generateFrameNumbers('archer', { start: 0, end:  7}),
            frameRate: 10,
            repeat: -1
        });
		
		this.anims.create({
            key: 'archer_forward_load',
            frames: this.anims.generateFrameNumbers('archer', { start: 9, end:  16}),
            frameRate: 10,
            repeat: -1
        });
		
		this.anims.create({
            key: 'archer_forward_fire',
            frames: this.anims.generateFrameNumbers('archer', { start: 17, end:  24}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'archer_stop',
            frames: [ { key: 'archer', frame: 7 } ],
            frameRate: 20
        });
		
		this.anims.create({
            key: 'archer_load',
            frames: [ { key: 'archer', frame: 9 } ],
            frameRate: 20
        });
		
		this.anims.create({
            key: 'archer_fire',
            frames: [ { key: 'archer', frame: 8 } ],
            frameRate: 20
        });
		
		
		//archer MPC animations///////////////////////////////////////////////////////
		this.anims.create({
            key: 'archer_MPC_forward',
            frames: this.anims.generateFrameNumbers('archer_MPC', { start: 0, end:  7}),
            frameRate: 10,
            repeat: -1
        });
		
		this.anims.create({
            key: 'archer_MPC_forward_load',
            frames: this.anims.generateFrameNumbers('archer_MPC', { start: 9, end:  16}),
            frameRate: 10,
            repeat: -1
        });
		
		this.anims.create({
            key: 'archer_MPC_forward_fire',
            frames: this.anims.generateFrameNumbers('archer_MPC', { start: 17, end:  24}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'archer_MPC_stop',
            frames: [ { key: 'archer_MPC', frame: 7 } ],
            frameRate: 20
        });
		
		this.anims.create({
            key: 'archer_MPC_load',
            frames: [ { key: 'archer_MPC', frame: 9 } ],
            frameRate: 20
        });
		
		this.anims.create({
            key: 'archer_MPC_fire',
            frames: [ { key: 'archer_MPC', frame: 8 } ],
            frameRate: 20
        });
		
		
		//helper MPC animations///////////////////////////////////////////////////////
		this.anims.create({
            key: 'helper_MPC_forward',
            frames: this.anims.generateFrameNumbers('helper_MPC', { start: 0, end:  7}),
            frameRate: 10,
            repeat: -1
        });
		
		this.anims.create({
            key: 'helper_MPC_forward_load',
            frames: this.anims.generateFrameNumbers('helper_MPC', { start: 9, end:  16}),
            frameRate: 10,
            repeat: -1
        });
		
		this.anims.create({
            key: 'helper_MPC_forward_fire',
            frames: this.anims.generateFrameNumbers('helper_MPC', { start: 17, end:  24}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'helper_MPC_stop',
            frames: [ { key: 'helper_MPC', frame: 7 } ],
            frameRate: 20
        });
		
		this.anims.create({
            key: 'helper_MPC_load',
            frames: [ { key: 'helper_MPC', frame: 9 } ],
            frameRate: 20
        });
		
		this.anims.create({
            key: 'helper_MPC_fire',
            frames: [ { key: 'helper_MPC', frame: 8 } ],
            frameRate: 20
        });
		
		
		//Villager animations//////////////////////////////////////////////////////////
		this.anims.create({
            key: 'villager_stop',
            frames: [ { key: 'villager_sprite', frame: 0 } ],
            frameRate: 20
        });
		
		this.anims.create({
            key: 'villager_forward',
            frames: this.anims.generateFrameNumbers('villager_sprite', { start: 0, end:  7}),
            frameRate: 10,
            repeat: -1
        });
		
		
		//Golem animation//////////////////////////////////////////////////////////////
		this.anims.create({
            key: 'golem_forward',
            frames: this.anims.generateFrameNumbers('golem', { start: 0, end:  7}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'golem_stop',
            frames: [ { key: 'golem', frame: 0 } ],
            frameRate: 20
        });
		
		this.anims.create({
            key: 'golem_fire',
            frames: [ { key: 'golem', frame: 8 } ],
            frameRate: 20
        });
		
		
		//boulder animations/////////////////////////////////////////////////////////////
		this.anims.create({
            key: 'boulder_forward',
            frames: this.anims.generateFrameNumbers( 'boulder', { start: 0, end:  3}),
            frameRate: 10,
            repeat: -1
        });
		
		this.anims.create({
            key: 'boulder_explode',
            frames: this.anims.generateFrameNumbers( 'boulder', { start: 4, end:  11}),
            frameRate: 10,
            repeat: 1
        });

		
		//arrow animation////////////////////////////////////////////////////////////////
		this.anims.create({
            key: 'arrow_move',
            frames: [ { key: 'arrow', frame: 0 } ],
            frameRate: 20
        });
		
		
		//health bar animations//////////////////////////////////////////////////////////
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
		
		
		//LumberJack animations///////////////////////////////////////////////////////////
		this.anims.create({ 
            key: 'lumberjack_forward',
            frames: this.anims.generateFrameNumbers('lumberjack', { start: 0, end: 7}),
            frameRate: 10, 
            repeat: -1
        });
		
		this.anims.create({
            key: 'lumberjack_attack', 
            frames: this.anims.generateFrameNumbers('lumberjack', { start: 8, end:  11}),
            frameRate: 30,
            repeat: 0
        });
		
		this.anims.create({
            key: 'lumberjack_hit_short', 
            frames: this.anims.generateFrameNumbers('lumberjack', { start: 8, end:  11}),
            frameRate: 12,
            repeat: 0
        });
		
		this.anims.create({
            key: 'lumberjack_attack_forward',
            frames: this.anims.generateFrameNumbers('lumberjack', { start: 14, end:  17}),
            frameRate: 30,
            repeat: 0
        });
		
		this.anims.create({
            key: 'lumberjack_stop',
            frames: [ { key: 'lumberjack', frame: 3 } ],
            frameRate: 20
        });
		
		this.anims.create({
            key: 'lumberjack_shield',
            frames: [ { key: 'lumberjack', frame: 20 } ],
            frameRate: 20
        });
		
		this.anims.create({
            key: 'lumberjack_jump_attack',
            frames: [ { key: 'lumberjack', frame: 10 } ],
            frameRate: 20
        });
		
		
		//Kight animations///////////////////////////////////////////////////////
		this.anims.create({
            key: 'knight_stop',
            frames: [ { key: 'knight', frame: 8 } ],
            frameRate: 20
        });
		
		this.anims.create({
            key: 'knight_shield',
            frames: [ { key: 'knight', frame: 24 } ],
            frameRate: 20
        });
		
		this.anims.create({
            key: 'knight_attack',
            frames: this.anims.generateFrameNumbers('knight', { start: 0, end:  7}),
            frameRate: 40,
            repeat: 0
        });
		
		this.anims.create({
            key: 'knight_forward',
            frames: this.anims.generateFrameNumbers('knight', { start: 8, end:  15}),
            frameRate: 10,
            repeat: -1
        });
		
		this.anims.create({
            key: 'knight_attack_forward',
            frames: this.anims.generateFrameNumbers('knight', { start: 16, end:  22}),
            frameRate: 40,
            repeat: 0
        });
		
		this.anims.create({
			key: 'knight_jump_attack',
            frames: [ { key: 'knight', frame: 23 } ],
            frameRate: 20
        });
		
		
		//Axe Animations////////////////////////////////////////////////////
		this.anims.create({
            key: 'axe_forward',
            frames: this.anims.generateFrameNumbers('axe', { start: 0, end:  7}),
            frameRate: 20,
            repeat: -1
        });
		
		
		//Axe Thrower Animations////////////////////////////////////////////
		this.anims.create({
            key: 'axe_thrower_forward',
            frames: this.anims.generateFrameNumbers('axe_thrower', { start: 0, end:  7}),
            frameRate: 10,
            repeat: -1
        });
		
		this.anims.create({
			key: 'axe_thrower_stop',
            frames: [ { key: 'axe_thrower', frame: 3 } ],
            frameRate: 20
        });
		
		this.anims.create({
			key: 'axe_thrower_load',
            frames: [ { key: 'axe_thrower', frame: 8 } ],
            frameRate: 20
        });
		
		this.anims.create({
            key: 'axe_thrower_fire',
            frames: this.anims.generateFrameNumbers('axe_thrower', { start: 8, end:  10}),
            frameRate: 60,
            repeat: 0
        });
		
		this.add.text(20, 20, "Loading game...");
        this.scene.start("Intro_Scene");
    
  };


}