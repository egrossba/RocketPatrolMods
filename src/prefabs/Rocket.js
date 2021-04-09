// Rocket (player) prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to the existing scene
        scene.add.existing(this);
        this.movementSpeed = 2;
    }

    update() {
        if(keyLEFT.isDown){
            this.x -= this.movementSpeed;
        }
        if(keyRIGHT.isDown){
            this.x += this.movementSpeed;
        }
    }
}