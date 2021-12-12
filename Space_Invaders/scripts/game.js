var h = window.innerHeight;
var w = window.innerHeight;
yams1 = function(yams){
	
	yams();

}

var config = {
        type: Phaser.AUTO,
        width: w,
        height: h,
		timing: yams1,
		mainPlayer: "archer",
		helper: false,
		scene: [LoadingScene, SceneMain, FreePlay],      
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 600 },
                debug: false
            }
        }
    };

var game = new Phaser.Game(config);
