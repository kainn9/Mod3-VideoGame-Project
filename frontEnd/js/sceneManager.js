

class SceneManager {
    constructor(name) {
        this.name = name;
        this.menuScreen = new Phaser.Scene(`${this.name}Menu`);
        this.mainScene = new Phaser.Scene(`${this.name}Main`);
        this.shopScene = new Phaser.Scene(`${this.name}Shop`);
        this.endScene = new Phaser.Scene(`${this.name}End`);

    }

    initializeShopScene() {
        
        this.shopScene.preload = function() {
            this.load.image('shop', 'assets/shop.png')
            this.load.image('antiGrav', 'assets/orbs/orb1.png')
            this.load.image('speed', 'assets/orbs/orb3.png')
            this.load.image('razorO', 'assets/orbs/orb2.png')
            this.load.image('escape', 'assets/orbs/orb6.png')
            this.load.spritesheet('playerDemon', 'assets/demonPlayer/demon-idle.png', { frameWidth: 160, frameHeight: 144 });

            //this.load.audio('shop', 'Castlevania - Symphony of the Night - Crystal Teardrops (Original Version) (152kbit_Opus).ogg')
        }

        this.shopScene.create = function () {
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
            //this.bgMusic  = this.sound.add('shop')
            //this.bgMusic.play

            this.map = this.add.sprite(0, 0, 'shop');
            this.map.setOrigin(0,0);
            this.map.setScale(2.0)

            let greeting = this.add.text(320, 100, 'Wecome to the Shop!');
            let deathDrop = this.add.text(300, 200, 'Click To Enter the Realm');
            deathDrop.setInteractive({ useHandCursor: true });

            deathDrop.on('pointerdown', () => {
                //this.playerDemon.destroy()
                elRestarto.r = true;
                //sceneManager.mainScene.scene.restart();
                this.scene.switch(sceneManager.mainScene);
                rmvButtons()
                
        
            });

            let speedText = this.add.text(250, 340, 'Speeder Orb 1400').setColor('green');
            speedText.setInteractive({ useHandCursor: true });
            speedText.on('pointerdown', () => {

                if (!areUBroke(1400)) {
                    purchase(105)
                    domYenniesSync(1400)

                    let check = document.querySelector('#dom-inv');
                    if (check) {
                        let nLi = document.createElement('li');
                        nLi.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-center inventory-items');
                        nLi.textContent = 'Speed Orb(MOD)';
                        nLi.dataset.id = 105;
                        check.appendChild(nLi);
                        let redBtn = document.createElement('span');
                        redBtn.setAttribute('class', 'badge badge-danger badge-pill')
                        redBtn.textContent = 'x';
                        redBtn.id = 'delete-button'
                        nLi.appendChild(redBtn);
                        // btn class : 'badge badge-danger badge-pill' id: 'delete-button' x <span>
                    }
                }
            });
            let razorText = this.add.text(470, 340, 'Razor Blade Orb 3000').setColor('red');
            razorText.setInteractive({ useHandCursor: true });
            razorText.on('pointerdown', () => {

                if (!areUBroke(3000)) {
                    purchase(102)
                    domYenniesSync(3000)

                    let check = document.querySelector('#dom-inv');
                    if (check) {
                        let nLi = document.createElement('li');
                        nLi.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-center inventory-items');
                        nLi.textContent = 'Razor Blade Orb(MOD)';
                        nLi.dataset.id = 102;
                        check.appendChild(nLi);
                        let redBtn = document.createElement('span');
                        redBtn.setAttribute('class', 'badge badge-danger badge-pill')
                        redBtn.textContent = 'x';
                        redBtn.id = 'delete-button'
                        nLi.appendChild(redBtn);
                        // btn class : 'badge badge-danger badge-pill' id: 'delete-button' x <span>
                    }
                }
            });

            let escapeText = this.add.text(620, 500, 'Escape Scroll $300');
            escapeText.setInteractive({ useHandCursor: true });
            escapeText.on('pointerdown', () => {

                if (!areUBroke(300)) {
                    purchase(104)
                    domYenniesSync(300)

                    let check = document.querySelector('#dom-inv');
                    if (check) {
                        let nLi = document.createElement('li');
                        nLi.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-center inventory-items');
                        nLi.textContent = 'Escape Scroll';
                        nLi.dataset.id = 104;
                        check.appendChild(nLi);
                        let redBtn = document.createElement('span');
                        redBtn.setAttribute('class', 'badge badge-danger badge-pill')
                        redBtn.textContent = 'x';
                        redBtn.id = 'delete-button'
                        nLi.appendChild(redBtn);
                        // btn class : 'badge badge-danger badge-pill' id: 'delete-button' x <span>
                    }
                }
            });

            let antiGravtext = this.add.text(10, 340, 'Anti-Grav Orb $2400').setColor('purple');
            antiGravtext.setInteractive({ useHandCursor: true });
            antiGravtext.on('pointerdown', () => {

                if (!areUBroke(2400)) {
                    purchase(103)
                    domYenniesSync(2400)

                    let check = document.querySelector('#dom-inv');
                    if (check) {
                        let nLi = document.createElement('li');
                        nLi.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-center inventory-items');
                        nLi.textContent = 'Anti Gravity Orb(MOD)';
                        nLi.dataset.id = 103;
                        check.appendChild(nLi);
                        let redBtn = document.createElement('span');
                        redBtn.setAttribute('class', 'badge badge-danger badge-pill')
                        redBtn.textContent = 'x';
                        redBtn.id = 'delete-button'
                        nLi.appendChild(redBtn);
                        // btn class : 'badge badge-danger badge-pill' id: 'delete-button' x <span>
                    }
                }
            });

            this.antiGravOrb = this.add.sprite(100, 280, 'antiGrav');
            this.antiGravOrb.setScale(0.7, 0.7)

            this.speedOrb = this.add.sprite(330, 280, 'speed');
            this.speedOrb.setScale(0.7, 0.7)

            this.razorOrb = this.add.sprite(560, 280, 'razorO');
            this.razorOrb.setScale(0.7, 0.7)

            this.escapeOrb = this.add.sprite(700, 440, 'escape');
            this.escapeOrb.setScale(0.7, 0.7)

            this.playerDemon = this.physics.add.sprite(0, 0, 'playerDemon');
            this.playerDemon.setBounce(0.4);
            this.playerDemon.setCollideWorldBounds(true);
            buildAnimation('demonIdle', 'playerDemon', 12, -1, this);
            this.playerDemon.play('demonIdle');
        }

        this.shopScene.update = function() {
            if (this.cursorKeys.left.isDown) {
                this.playerDemon.setVelocityX(-130 * this.playerDemon.speeder);
                this.playerDemon.flipX = false;
            } else if (this.cursorKeys.right.isDown) {
                this.playerDemon.setVelocityX(130 * this.playerDemon.speeder);
                this.playerDemon.flipX = true;
            } else if (this.cursorKeys.up.isDown) {
                this.playerDemon.setVelocityY(-130 * this.playerDemon.speeder)
            } else if (this.cursorKeys.left.isDown && this.cursorKeys.up.isDown) {
                this.playerDemon.setVelocity(-130 * this.playerDemon.speeder, -130 * this.playerDemon.speeder)
            } else if (this.cursorKeys.right.isDown && this.cursorKeys.up.isDown) {
                this.playerDemon.setVelocity(130 * this.playerDemon.speeder, -130 * this.playerDemon.speeder)
            } else if (this.cursorKeys.down.isDown) {
                this.playerDemon.setVelocity(0, 150 * this.playerDemon.speeder)
            } else if (this.playerDemon.antiGrav){
                this.playerDemon.setVelocity(0,0);
            }
            
            sceneManager.isShop = true;
            mod(this.playerDemon);


            //console.log()
            //timerText.textContent = `TIME LIFT UNTIL PORTAL OPENS: ${300 - (Math.floor(this.timer.getElapsedSeconds())) } Seconds`

        }




    }


    initializeEndScene() {
        this.endScene.preload = function() {
            this.load.image('shop', 'assets/shop.png')

        }

        this.endScene.create = function () {
            this.map = this.add.sprite(0, 0, 'shop');
            this.map.setOrigin(0,0);
            this.map.setScale(2.0)

            let deathMsg = this.add.text(310, 225, 'You Have Died');
            let shopMsg = this.add.text(280, 325, 'click me to open shop');


            let dropDeath = this.add.text(260, 425, 'click me to drop into realm');
            dropDeath.setInteractive({ useHandCursor: true });
            shopMsg.setInteractive({ useHandCursor: true });

            shopMsg.on('pointerdown', () => {
                this.scene.switch(sceneManager.shopScene);
                console.log('SHOPO')
            });

            dropDeath.on('pointerdown', () => {
                
                elRestarto.r = true;
                this.scene.switch(sceneManager.mainScene)
        
            });
        }

        this.endScene.update = function() {
            sceneManager.isShop = false;
        }


    }

    initializeMenuScene() {
       this.menuScreen.preload = function() {

       }

       this.menuScreen.create = function () {
           let text = this.add.text(333, 125, 'click me to spawn');
           text.setInteractive({ useHandCursor: true });
        //    console.log('this is', sceneManager);
           console.dir(this.scene)
           text.on('pointerdown', () => this.scene.switch(sceneManager.mainScene));
       }
    }

    initializeMainScene(game) {
        this.mainScene.preload = function() {
            this.load.audio('tpja', 'assets/orbs/tpja2.mp3');
            loadBar(this)
            map.preLoad();
            demon.preLoad();
            superItems.preLoad()
            // this.load.spritesheet('chest', 'assets/items/chest-idle.png', { frameWidth: 31, frameHeight: 23 });
            // this.load.spritesheet('chestOpen', 'assets/items/chest-open.png', { frameWidth: 32, frameHeight: 23 });
            enemies.preLoad();
        };

        // METHOD 2: We can load/render our assets inside this function
        this.mainScene.create = function() {
            map.create();
            demon.create();
            superItems.create()
            enemies.create();
            this.trappingInJapan = this.sound.add('tpja');
            this.trappingInJapan.play({
                mute: false,
                volume: 1,
                detune: 0,
                seek: 0,
                loop: false,
                delay: 0,
            })


            // This creates our own special event listeners on the scene Obj that listen for key presses
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
                this.trappingInJapan.stop()
               let items = document.querySelectorAll('.list-group-item')
                
                items.forEach(li => {
                    let btn = document.createElement('span');
                    btn.setAttribute('class', "badge badge-danger badge-pill");
                    btn.hidden = false;
                    btn.id = 'delete-button'
                    btn.textContent = 'x'
                    li.append(btn);
                })
                

                /* <span class="badge badge-danger badge-pill" hidden="true" id='delete-button'>x</span>`

            itemLi.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-center inventory-items')
            itemLi.setAttribute('data-id', `${item.id}`) */


                
            });
        }

        this.mainScene.update = function() {
            sceneManager.isShop = false;
            const timerText = document.querySelector('#timer')
            if(this.attack) {
                this.playerDemon.flipX ? (this.attack.setPosition(this.playerDemon.x + 35, this.playerDemon.y + 40)) : (this.attack.setPosition(this.playerDemon.x - 35, this.playerDemon.y + 40))
            }
            demon.move();
            demon.attackBasic();
            demon.razorBladeAttack()
            mod(this.playerDemon);
            this.playerDemon.body.setSize(40, 90, true)

            if (this.cursorKeys.x.isDown && this.playerDemon.quickEscapeScroll) {
                consumeScroll()
                this.quickEscapeAudio.play()
                this.playerDemon.play('desc')
                setTimeout(() => {
                    this.playerDemon.play('demonIdle');
                    this.scene.switch(sceneManager.shopScene);
                    let ul = document.querySelector('#dom-inv');
                    if (ul) syncInv(ul);
                }, 800)
            }

        
            timerText.textContent = `TIME LIFT UNTIL PORTAL OPENS: ${240 - (Math.floor(this.timer.getElapsedSeconds())) } Seconds`


        }
    }
}



