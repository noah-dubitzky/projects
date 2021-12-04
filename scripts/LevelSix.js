
class LevelSix extends SceneMain {
	
  constructor() { 
   super("LevelSix");
	
  }
  
  create(){
	  
	  this.nextLevel = "EndingScene";
	  
	  config.helper = false;
	  
	  this.createScene(0, 0, 0);
	  
 }
  
}