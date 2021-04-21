class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('starfield', 'assets/starfield.png');
        this.load.image('rocket', 'assets/rocket.png');
        this.load.image('rocket2', 'assets/rocket2.png');
        this.load.image('spaceship', 'assets/spaceship.png');
        this.load.spritesheet('explosion', './assets/explosion.png', 
        {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {

        this.starfield = this.add.tileSprite(
            0,0,640,480, 'starfield'
        ).setOrigin(0,0);

        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        this.p2Rocket = new Rocket2(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket2').setOrigin(0.5, 0);

        this.ship1 = new Ship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship2 = new Ship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship3 = new Ship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);

        // green UI background
        this.add.rectangle(
            0,
            borderUISize + borderPadding,
            game.config.width,
            borderUISize * 2,
            0x00FF00,
            ).setOrigin(0,0);

        // white borders
	    this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        leftClick = this.input.mousePointer;

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion',
            {start: 0, end: 9, first: 0}), frameRate: 30
        });  
        
        this.p1Score = 0;
        this.p2Score = 0;
        this.totalScore = 0;

        // display score
        this.score1Config = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.score2Config = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#87CEEB',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.score3Config = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#FFFFFF',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.scoreLeft = this.add.text(borderUISize + borderPadding, 
            borderUISize + borderPadding*2, this.p1Score, this.score1Config);
        
        this.scoreMid = this.add.text(borderUISize + borderPadding + 100, 
            borderUISize + borderPadding*2, this.p2Score, this.score2Config);
        
        this.scoreRight = this.add.text(borderUISize + borderPadding + 200, 
        borderUISize + borderPadding*2, this.totalScore, this.score3Config);
    
        this.gameOver = false;

        this.score1Config.fixedWidth = 0;
        this.score2Config.fixedWidth = 0;
        this.score3Config.fixedWidth = 0;
        
        // display clock
        let clockConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#FACADE',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        
        // create timer to display
        this.timer = game.settings.gameTimer / 1000;

        this.clockRight = this.add.text(game.config.width - 140, 
            borderUISize + borderPadding*2, ':' + this.timer, clockConfig);

        // call tick timer to decrease every second
        this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.tickTimer, callbackScope: this, loop: true });
            
        let bonusConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '',
            color: '#DC143C',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.timeBonus = this.add.text(game.config.width/2, game.config.height/2, '', bonusConfig);
        
        this.hunnit = 1;

        // sfx list
        this.explosions = ['sfx_explosion1', 'sfx_explosion2', 'sfx_explosion3', 'sfx_explosion4'];
    }

    update() {
        // check key input for restart
        if (Phaser.Input.Keyboard.JustDown(keyR) || this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= 4;
        this.p1Rocket.update();
        this.p2Rocket.update();
        this.ship1.update();
        this.ship2.update();
        this.ship3.update();

        this.checkCollision(this.p1Rocket, this.ship1);
        this.checkCollision(this.p1Rocket, this.ship2);
        this.checkCollision(this.p1Rocket, this.ship3);

        this.checkCollision(this.p2Rocket, this.ship1);
        this.checkCollision(this.p2Rocket, this.ship2);
        this.checkCollision(this.p2Rocket, this.ship3);

        if (!this.gameOver) {               
            this.p1Rocket.update();
            this.p2Rocket.update();         // update rocket sprite
            this.ship1.update();           // update spaceships (x3)
            this.ship2.update();
            this.ship3.update();
        } 

        if(this.timer == 0){
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.score1Config).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or <- for Menu', this.score1Config).setOrigin(0.5);
            this.gameOver = true;
        }
        
    }

    shipExplode(rocket, ship) {
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');

        // score add and repaint
        if(rocket == this.p1Rocket){
            this.p1Score += ship.points;
            this.scoreLeft.text = this.p1Score;
        }
        else{
            this.p2Score += ship.points;
            this.scoreMid.text = this.p2Score;
        }

        this.totalScore += ship.points;
        this.scoreRight.text = this.totalScore;

        // timer add
        if(this.timer > 0 && this.totalScore/100 >= this.hunnit){
            this.timer += 2;
            this.clockRight.text = ':' + this.timer;
            this.timeBonus.x = ship.x - 60;
            this.timeBonus.y = ship.y;
            this.timeBonus.text = '+2s';
            this.hunnit++;
        }

        ship.reset();

        boom.on('animationcomplete', () => {
            boom.destroy();
            this.timeBonus.text = '';
        });

        let index = Math.floor(Math.random() * this.explosions.length);
        this.sound.play(this.explosions[index]);  
    }

    checkCollision(rocket, ship) {
        if(rocket.x + rocket.width > ship.x &&
            rocket.x < ship.x + ship.width &&
            rocket.y + rocket.height > ship.y &&
            rocket.y < ship.y + ship.height){
                ship.alpha = 0;
                rocket.reset();
                this.shipExplode(rocket, ship);
            }
    }

    tickTimer() {
        // update timer
        if(this.timer > 0){
            this.timer -= 1;
            this.clockRight.text = ':' + this.timer;
        }
    }
}