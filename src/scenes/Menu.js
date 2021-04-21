class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', 'assets/blip_select12.wav');
        this.load.audio('sfx_explosion1', 'assets/explosion1.wav');
        this.load.audio('sfx_explosion2', 'assets/explosion2.wav');
        this.load.audio('sfx_explosion3', 'assets/explosion3.wav');
        this.load.audio('sfx_explosion4', 'assets/explosion4.wav');
        this.load.audio('sfx_rocket', 'assets/rocket_shot.wav');

        this.load.image('rocketPatrolMenu', 'assets/rocketPatrolMenu.png');
    }

    create() {
        
        this.rocketPatrolMenu = this.add.tileSprite(
            0,30,0,0, 'rocketPatrolMenu'
        ).setOrigin(0,0);

        this.rocketPatrolMenu.displayWidth = game.config.width*1;
        this.rocketPatrolMenu.scaleY = this.rocketPatrolMenu.scaleX;

        // let menuConfig = {
        //     fontFamily: 'Courier',
        //     fontSize: '28px',
        //     backgroundColor: '#F3B141',
        //     color: '#843605',
        //     align: 'right',
        //     padding: {
        //         top: 5,
        //         bottom: 5,
        //     },
        //     fixedWidth: 0
        // }

        // this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
        //     borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        // this.add.text(game.config.width/2, game.config.height/2, 
        //     'Use <--> arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        // menuConfig.backgroundColor = '#00FF00';
        // menuConfig.color = '#000';
        // this.add.text(game.config.width/2, game.config.height/2 + borderUISize +
        //     borderPadding, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5);
    
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 1,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 2,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
      }
}
