// Rocket (player) prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to the existing scene
        scene.add.existing(this);
        this.movementSpeed = 2;
        this.isFiring = false;
    }

    update() {
        if(this.isFiring){

        }
        
        if(keyLEFT.isDown){
            this.x -= this.movementSpeed;
        }
        if(keyRIGHT.isDown){
            this.x += this.movementSpeed;
        }

        this.x = Phaser.Math.Clamp(this.x, borderUISize+borderPadding, game.config.width=borderUISize-borderPadding);
    }
}