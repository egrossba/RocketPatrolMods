class Ship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
    }

    update() {
        this.x -= 2;

        if (this.x < -this.width){
            this.reset();
        }
    }

    reset() {
        this.x = game.config.width;
        this.alpha = 1;
    }
}