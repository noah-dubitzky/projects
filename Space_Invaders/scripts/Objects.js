class Objects extends Phaser.GameObjects.Sprite { //extend from the sprite class
    constructor(config) {
        super(config.scene, config.x, config.y, "object"); //variables for the gladiator
		
		
		//character specific
		var sprite = this;
		
		this.type = "object";
		
		this.scene = config.scene;
		
		config.scene.add.existing(this); //add the sprite to the scene
		config.scene.physics.world.enableBody(this); //give it physics
		
		this.body.allowGravity = false;
		this.body.bounce.set(0);
		
		this.setOrigin(0.5, 0.5);
		
		this.body.immovable = true;
		
		this.rescale = this.scene.scale; 
		
		this.animationString = 'Space_Ship_Stay'; 
		
		this.setDepth(1);
		
		this.speed = this.scene.width/1.2;
		
		this.isDead = false;
		
		
	}
	
	setIntervalScene(timingFunction, time, a = 1, b = 1, c = 1, d = 1){
		
		var name;
		var parameterNum = arguments.length;
		var sprite = this;
		function mainFunction(){};
		
		
		switch(parameterNum) {
			
			case 2:
				mainFunction = function(){ timingFunction(); };
			break;
			case 3:
				mainFunction = function(){ timingFunction(a); };
			break;
			case 4:
				mainFunction = function(){ timingFunction(a, b); };
			break;
			case 5:
				mainFunction = function(){ timingFunction(a, b, c); };
			break;
			case 6:
				mainFunction = function(){ timingFunction(a, b, c, d); };
			break;
		}
		
		
		function PausedFunction(){
			
			if(!sprite.scene.pause){
						
				mainFunction();
				
			}
		}
		
		name = setInterval(PausedFunction, time);
		
		return name;
		
	}
	
	setTimeoutScene(timingFunction, time, a = 1, b = 1, c = 1, d = 1){
		
		var name;
		var parameterNum = arguments.length;
		var time = time / 100;
		var i = 0;
		var sprite = this;
		function mainFunction(){};
		
		//window.alert(sprite.scene);
		
		switch(parameterNum) {
			
			case 2:
				mainFunction = function(){ timingFunction(); };
			break;
			case 3:
				mainFunction = function(){ timingFunction(a); };
			break;
			case 4:
				mainFunction = function(){ timingFunction(a, b); };
			break;
			case 5:
				mainFunction = function(){ timingFunction(a, b, c); };
			break;
			case 6:
				mainFunction = function(){ timingFunction(a, b, c, d); };
			break;
		}
		
		function PausedFunction(){
			
			if(i >= 100){
				
				mainFunction();
				sprite.clearTimeout(name);
				
			}else if(!sprite.scene.pause){
						
				i++;
					
			}
			
		}
		
		name = setInterval(PausedFunction, time);
		
		return name;
		
	}
	
	clearTimeout(name){
		
		clearInterval(name);
		
	}
	
	clearInterval(name){
		
		clearInterval(name);
		
	}
	
	
	AddToGroup(group)
	{
		group.add(this); //add the sprite the main Players group
		
		this.body.allowGravity = false;
		this.body.bounce.set(0);
			
		this.body.immovable = true;
	}
	
	//character specific
	configSize(h, w, hBox, wBox, x, y)
	{
		this.newSizeY = this.rescale*h;
		this.newSizeX = this.rescale*w;
		this.body.setSize(hBox, wBox, true); //adjust the size of the hitbox
		this.body.setOffset(x, y); //adjust the position of the hitbox
		
		this.setScale(this.rescale);
		
		if(this.type == "enemy")
		{
			
			this.xAddH = 0;
			this.yAddH = this.newSizeY/2;
			
		}
		
	}
	
	//character specific
	move(dir){ //allows the sprite to move (r=right, l=left, s=stop, j=jump, lo=load, f=fire)
		
		if(dir == "l"){ 
			
			this.body.velocity.x = -this.speed;
		    this.anims.play(this.animationString, true);
			this.flipX = true;
			
		}else if(dir == "r"){ 
			
			this.body.velocity.x = this.speed;
		    this.anims.play(this.animationString, true);
			this.flipX = true;
			
		}if(dir == "u"){ 
			
			this.body.velocity.y = -this.speed;
		    this.anims.play(this.animationString, true);
			this.flipX = true;
			
		}else if(dir == "d"){ 
			
			this.body.velocity.y = this.speed;
		    this.anims.play(this.animationString, true);
			this.flipX = true;
			
		}else if(dir == "slr"){ 
			
			this.body.velocity.x = 0;
		    this.anims.play(this.animationString, true);
			this.flipX = true;
			
		}else if(dir == "sud"){ 
			
			this.body.velocity.y = 0;
		    this.anims.play(this.animationString, true);
			this.flipX = true;
			
		}
		else if(dir == "s"){ 
			
			this.body.velocity.y = 0;
			this.body.velocity.x = 0;
		    this.anims.play(this.animationString, true);
			this.flipX = true;
			
		}
		
	}
	
  
}