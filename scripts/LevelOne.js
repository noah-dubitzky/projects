

//increase registerHitSpeed and play animation faster to accomodate for spam clicking 
//allow archer player to fire while running 
class LevelOne extends SceneMain {
	
  constructor() { 
   super("LevelOne");
	
  }
  
  create(){
	  
	  this.nextLevel = "LevelTwo";
	  
	  config.helper = false;
	  
	  this.createScene( 3, 0, 0); 

 }
  
}
