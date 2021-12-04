

//increase registerHitSpeed and play animation faster to accomodate for spam clicking 
//allow archer player to fire while running 
class LevelTwo extends SceneMain {
	
  constructor() { 
   super("LevelTwo");
	
  }
  
  create(){
	  
	  this.nextLevel = "LevelThree";
	  
	  this.createScene( 3, 2, 0); 
	 
 
 }
  
}