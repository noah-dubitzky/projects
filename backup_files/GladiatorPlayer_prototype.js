class GladiatorPlayer extends Gladiator { //extend from the sprite class
    constructor(config) {
        super(config); //variables for the gladiator

		this.setUpKeyInputs(this);

		config.scene.gladiatorPlayers.add(this); //add the gladiator to the "gladiators" group
	}

	preUpdate(time, delta){ //this is the update function
		
		super.preUpdate(time, delta); //init update function

		this.updatePlayerActions();

	}
}