class Rocket2 extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.movementSpeed = 2;
        this.isFiring = false;
        this.sfxRocket = scene.sound.add('sfx_rocket');
        game.input.mouse.capture = true;
    }

    update() {
        if(this.isFiring) {
            this.y -= this.movementSpeed;
            if(this.y < borderUISize*3) {
                this.y = game.config.height-borderUISize-borderPadding;
                this.isFiring = false;
            }
        } else {
            
            this.x = game.input.mousePointer.x;
            if(leftClick.isDown) {
                    this.isFiring = true;
                    this.sfxRocket.play();
                }
    
            this.x = Phaser.Math.Clamp(
                this.x,
                borderUISize + borderPadding,
                game.config.width - borderUISize - borderPadding);
        }
        
    }

    reset() {
        this.y = game.config.height-borderUISize-borderPadding;
        this.isFiring = false;
    }
}