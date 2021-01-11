

class SceneManager {

    constructor(name) {

        this.name = name;
        this.menuScreen = new Phaser.Scene(`${this.name}Menu`);
        this.mainScene = new Phaser.Scene(`${this.name}Main`);
        this.shopScene = new Phaser.Scene(`${this.name}Shop`);
        this.endScene = new Phaser.Scene(`${this.name}End`);

    };

    initializeShopScene() {
        
        this.shopScene.preload = function() {
            this.load.image('shop', 'assets/shop.png');
            this.load.image('antiGrav', 'assets/orbs/orb1.png');
            this.load.image('speed', 'assets/orbs/orb3.png');
            this.load.image('razorO', 'assets/orbs/orb2.png');
            this.load.image('escape', 'assets/orbs/orb6.png');
            this.load.spritesheet('playerDemon', 'assets/demonPlayer/demon-idle.png', { frameWidth: 160, frameHeight: 144 });
        };

        this.shopScene.create = function() {

            this.cursorKeys = this.input.keyboard.addKeys(
                {
                    up:Phaser.Input.Keyboard.KeyCodes.W,
                    down:Phaser.Input.Keyboard.KeyCodes.S,
                    left:Phaser.Input.Keyboard.KeyCodes.A,
                    right:Phaser.Input.Keyboard.KeyCodes.D,
                    space:Phaser.Input.Keyboard.KeyCodes.SPACE,
                    f:Phaser.Input.Keyboard.KeyCodes.F,
                }
            );
    
            this.map = this.add.sprite(0, 0, 'shop');
            this.map.setOrigin(0,0);
            this.map.setScale(2.0);

            let greeting = this.add.text(320, 100, 'Wecome to the Shop!');
            let deathDrop = this.add.text(300, 200, 'Click To Enter the Realm');
            deathDrop.setInteractive({ useHandCursor: true });

            deathDrop.on('pointerdown', () => {
    
                elRestarto.r = true;
                this.scene.switch(sceneManager.mainScene);
                rmvButtons();
                
            });

            let speedText = this.add.text(250, 340, 'Speeder Orb 1400').setColor('green');
            speedText.setInteractive({ useHandCursor: true });
            speedText.on('pointerdown', () => {
                areUBroke(1400, speederBuy);
             
            });

            let razorText = this.add.text(470, 340, 'Razor Blade Orb 3000').setColor('red');
            razorText.setInteractive({ useHandCursor: true });
            
            razorText.on('pointerdown', () => {

                areUBroke(3000, razorBuy);

            });

            let escapeText = this.add.text(620, 500, 'Escape Scroll $300');
            escapeText.setInteractive({ useHandCursor: true });

            escapeText.on('pointerdown', () => {

                areUBroke(300, escapeScrollBuy);

            });

            let antiGravtext = this.add.text(10, 340, 'Anti-Grav Orb $2400').setColor('purple');
            antiGravtext.setInteractive({ useHandCursor: true });

            antiGravtext.on('pointerdown', () => {

                areUBroke(2400, antiGravBuy);
    
            });

            this.antiGravOrb = this.add.sprite(100, 280, 'antiGrav');
            this.antiGravOrb.setScale(0.7, 0.7);

            this.speedOrb = this.add.sprite(330, 280, 'speed');
            this.speedOrb.setScale(0.7, 0.7);

            this.razorOrb = this.add.sprite(560, 280, 'razorO');
            this.razorOrb.setScale(0.7, 0.7);

            this.escapeOrb = this.add.sprite(700, 440, 'escape');
            this.escapeOrb.setScale(0.7, 0.7);

            this.playerDemon = this.physics.add.sprite(0, 0, 'playerDemon');
            this.playerDemon.setBounce(0.4);
            this.playerDemon.setCollideWorldBounds(true);
            buildAnimation('demonIdle', 'playerDemon', 12, -1, this);
            this.playerDemon.play('demonIdle');
        };

        this.shopScene.update = function() {

            if (this.cursorKeys.left.isDown) {

                this.playerDemon.setVelocityX(-130 * this.playerDemon.speeder);
                this.playerDemon.flipX = false;

            } else if (this.cursorKeys.right.isDown) {

                this.playerDemon.setVelocityX(130 * this.playerDemon.speeder);
                this.playerDemon.flipX = true;

            } else if (this.cursorKeys.up.isDown) {

                this.playerDemon.setVelocityY(-130 * this.playerDemon.speeder);

            } else if (this.cursorKeys.left.isDown && this.cursorKeys.up.isDown) {

                this.playerDemon.setVelocity(-130 * this.playerDemon.speeder, -130 * this.playerDemon.speeder);

            } else if (this.cursorKeys.right.isDown && this.cursorKeys.up.isDown) {

                this.playerDemon.setVelocity(130 * this.playerDemon.speeder, -130 * this.playerDemon.speeder);

            } else if (this.cursorKeys.down.isDown) {

                this.playerDemon.setVelocity(0, 150 * this.playerDemon.speeder);

            } else if (this.playerDemon.antiGrav) {

                this.playerDemon.setVelocity(0,0);
            }
            
            sceneManager.isShop = true;
            mod(this.playerDemon);
        };
    };


    initializeEndScene() {

        this.endScene.preload = function() {

            this.load.image('shop', 'assets/shop.png')

        };

        this.endScene.create = function () {

            this.map = this.add.sprite(0, 0, 'shop');
            this.map.setOrigin(0,0);
            this.map.setScale(2.0);

            let deathMsg = this.add.text(310, 225, 'You Have Died');
            let shopMsg = this.add.text(280, 325, 'click me to open shop');


            let dropDeath = this.add.text(260, 425, 'click me to drop into realm');
            dropDeath.setInteractive({ useHandCursor: true });
            shopMsg.setInteractive({ useHandCursor: true });

            shopMsg.on('pointerdown', () => {

                this.scene.switch(sceneManager.shopScene);

            });

            dropDeath.on('pointerdown', () => {
                
                elRestarto.r = true;
                this.scene.switch(sceneManager.mainScene);
        
            });
        };

        this.endScene.update = function() {

            sceneManager.isShop = false;

        };
    };

    initializeMenuScene() {

        this.menuScreen.preload = function() {};

        this.menuScreen.create = function () {

            let text = this.add.text(333, 125, 'click me to spawn');
            text.setInteractive({ useHandCursor: true });
            text.on('pointerdown', () => this.scene.switch(sceneManager.mainScene));

        };
    };

    initializeMainScene(game) {

        this.mainScene.preload = function() {

            this.load.audio('tpja', 'assets/orbs/tpja2.ogg');
            loadBar(this);
            map.preLoad();
            demon.preLoad();
            superItems.preLoad();
            enemies.preLoad();

        };

        this.mainScene.create = function() {
            map.create();
            demon.create();
            superItems.create();
            enemies.create();

            this.trappingInJapan = this.sound.add('tpja');
            this.trappingInJapan.play({
                mute: false,
                volume: 1,
                detune: 0,
                seek: 0,
                rate: 0.75,
                loop: true,
                delay: 0,
            });

            // This creates our phaser event listeners on the scene Obj that listen for key presses
            this.cursorKeys = this.input.keyboard.addKeys(
                {
                    up:Phaser.Input.Keyboard.KeyCodes.W,
                    down:Phaser.Input.Keyboard.KeyCodes.S,
                    left:Phaser.Input.Keyboard.KeyCodes.A,
                    right:Phaser.Input.Keyboard.KeyCodes.D,
                    space:Phaser.Input.Keyboard.KeyCodes.SPACE,
                    f:Phaser.Input.Keyboard.KeyCodes.F,
                    x:Phaser.Input.Keyboard.KeyCodes.X,
                }
            );


            gen(9, 9, this);

            enemies.fskSpawn();

            this.timer = this.time.delayedCall(240000, () => {
                survivor(demon.currentUser, demon.inventory);
                this.trappingInJapan.stop();
                let items = document.querySelectorAll('.list-group-item');
                
                items.forEach(li => {
                    let btn = document.createElement('span');
                    btn.setAttribute('class', "badge badge-danger badge-pill");
                    btn.hidden = false;
                    btn.id = 'delete-button';
                    btn.textContent = 'x';
                    li.append(btn);
                });
            });
        };

        this.mainScene.update = function() {

            sceneManager.isShop = false;
            const timerText = document.querySelector('#timer');

            if(this.attack) {

                this.playerDemon.flipX ? (this.attack.setPosition(this.playerDemon.x + 35, this.playerDemon.y + 40)) : (this.attack.setPosition(this.playerDemon.x - 35, this.playerDemon.y + 40));

            };

            demon.move2();
            demon.attackBasic();
            demon.razorBladeAttack();
            mod(this.playerDemon);
            this.playerDemon.body.setSize(40, 90, true);

            if (this.cursorKeys.x.isDown && this.playerDemon.quickEscapeScroll) {

                consumeScroll();
                this.quickEscapeAudio.play();
                this.playerDemon.play('desc');

                setTimeout(() => {
                    demon.hp = 5;
                    demon.resetHealth();
                    demon.createHealth();
                    this.playerDemon.play('demonIdle');
                    this.scene.switch(sceneManager.shopScene);
                    let ul = document.querySelector('#dom-inv');
                    if (ul) syncInv(ul);
                }, 800)
            };
            timerText.textContent = `TIME LEFT UNTIL PORTAL OPENS: ${240 - (Math.floor(this.timer.getElapsedSeconds())) } Seconds`;
        }
    }
}



