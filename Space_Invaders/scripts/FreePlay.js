
class FreePlay extends SceneMain {
  constructor() { 
    super("FreePlay");
	
	//this.enemy3Spawn[1] = false;
	//this.homingSpawn[1] = false;
	  
	  this.level = 0;
	  
	  var scene = this;
	  
	  this.SpawnElements();
	  /*
	  this.getFaster = setInterval(function(){
		  
		  if(!scene.pause){
			
			scene.level++;
			
			  if(scene.level == 4){
				  
				 scene.homingSpawn[1] = true;
				  
			  }else if(scene.level == 6){
				  
				 scene.enemy3Spawn[1] = true;
				  
			  }else{
			  
				 scene.incremSpawner()
				
			  }
		  }
		  
	  }, 1000);
		*/
  }
  
  incremSpawner(){
		
	for(var i = 0; i < this.characters.length - 2; i++)
	{
		
		this.characters[i][2] -= 100;
		
	}
	
	this.SpawnElements();
	 
  }
  
}