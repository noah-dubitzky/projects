
class LevelFour extends SceneMain {
	
  constructor() { 
   super("LevelFour");
	
  }
  
  create(){
	  
	  this.nextLevel = "LevelFive";
	  
	  config.helper = true;
	  
	  this.createScene(6, 2, 2);
 
 }
  
}