var h = window.innerHeight * .95;
var w = h * 2;

var gravity = w / 2.7;

var config = {
        type: Phaser.AUTO,
        width: w,
        height: h,
		mainPlayer: "archer",
		helper: false,
		scene: [LoadingScene, Intro_Scene, Intro_Scene_2, LevelOne, LevelTwo, LevelThree, LevelFour, LevelFive, LevelSix, Intro_Helper_Scene, Intro_Golem_Scene, EndingScene],      
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: gravity },
                debug: false
            }
        }
    };

var bricks;

var game = new Phaser.Game(config);