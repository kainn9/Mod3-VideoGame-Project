
class DemonPlayer {
    constructor(scene) {
        this.scene = scene;
        this.hp = 5;
        this.inventory = [];
        this.alive = true;
        //this.attacked = false;
        //this.isAttacking = false;
        this.currentUser = null;


    }

    preLoad() {
        this.scene.load.spritesheet('playerDemon', 'assets/demonPlayer/demon-idle.png', { frameWidth: 160, frameHeight: 144 });
        this.scene.load.spritesheet('demonAttack', 'assets/demonPlayer/demon-attack.png', { frameWidth: 240, frameHeight: 192 });
        this.scene.load.spritesheet('demonDamage', 'assets/demonPlayer/demon-dmg.png', { frameWidth: 192, frameHeight: 176 });
        this.scene.load.spritesheet('demonDeath', 'assets/demonPlayer/death.png', { frameWidth: 128, frameHeight: 128 });
        this.scene.load.image('heart', 'assets/demonPlayer/health.png')
        this.scene.load.image('hitbox', 'assets/demonPlayer/hitbox.png')
        this.scene.load.spritesheet('razor', 'assets/demonPlayer/razorCircle.png', { frameWidth: 46, frameHeight: 50});
        this.scene.load.spritesheet('desc', 'assets/demonPlayer/escape.png', { frameWidth: 160, frameHeight: 160});
        this.scene.load.audio('dHitS', 'assets/demonPlayer/soundHit.wav');
        this.scene.load.audio('pU', 'assets/demonPlayer/pickup.ogg');
        this.scene.load.audio('flameAudio', 'assets/demonPlayer/flame.wav');
        this.scene.load.audio('pDeathSound', 'assets/demonPlayer/deathS.wav');
        this.scene.load.audio('quickEscapeAudio', 'assets/demonPlayer/quickEscape.wav');

    }

    create() {
        let s = this.scene;
        s.attacks = s.physics.add.group()
        s.playerDemon = s.physics.add.sprite(3000, 6000, 'playerDemon');

        s.itemPickup = s.sound.add('pU');
        s.demoHitSound = s.sound.add('dHitS');
        s.flameAudio = s.sound.add('flameAudio');
        s.pDeathAudio = s.sound.add('pDeathSound');
        s.quickEscapeAudio = s.sound.add('quickEscapeAudio');

        s.playerDemon.setScale(0.75, 0.75);
        s.playerDemon.body.setSize(60, 90, true);
        s.playerDemon.depth = 2;
        s.playerDemon.setBounce(0.4);
        s.playerDemon.setCollideWorldBounds(true);
        s.physics.add.collider(s.playerDemon, s.platforms);
        s.cameras.main.startFollow(s.playerDemon);
        buildAnimation('demonIdle', 'playerDemon', 12, -1, s);
        buildAnimation('demonAttack', 'demonAttack', 20,  0, s);
        buildAnimation('demonDamage', 'demonDamage', 12,  0, s);
        buildAnimation('demonDeath', 'demonDeath', 8,  -1, s);
        buildAnimation('razorBlade', 'razor', 12, -1, s)
        buildAnimation('desc', 'desc', 1, -1, s)
        s.playerDemon.play('demonIdle');

        this.createHealth();
        // s.physics.add.collider(this, s.playerDemon, () => {
        //     demon.loseHealth();
        // })
        demon.inventory = [];
    }

    move () {
        const scene = this.scene;

        if (scene.cursorKeys.left.isDown) {
            scene.playerDemon.setVelocityX(-130 * scene.playerDemon.speeder);
            scene.playerDemon.flipX = false;
        } else if (scene.cursorKeys.right.isDown) {
            scene.playerDemon.setVelocityX(130 * scene.playerDemon.speeder);
            scene.playerDemon.flipX = true;
        } else if (scene.cursorKeys.up.isDown) {
            scene.playerDemon.setVelocityY(-130 * scene.playerDemon.speeder)
        } else if (scene.cursorKeys.left.isDown && scene.cursorKeys.up.isDown) {
            scene.playerDemon.setVelocity(-130 * scene.playerDemon.speeder, -130 * scene.playerDemon.speeder)
        } else if (scene.cursorKeys.right.isDown && scene.cursorKeys.up.isDown) {
            scene.playerDemon.setVelocity(130 * scene.playerDemon.speeder, -130 * scene.playerDemon.speeder)
        } else if (scene.cursorKeys.down.isDown) {
            scene.playerDemon.setVelocity(0, 150 * scene.playerDemon.speeder)
        } else if (scene.playerDemon.antiGrav){

            //want to add slight drag
            scene.playerDemon.setVelocityY(0);
        }
    }
    move2 () {
        const scene = this.scene;

        if (scene.cursorKeys.left.isDown) {
            scene.playerDemon.setVelocityX(-130 * scene.playerDemon.speeder);
            scene.playerDemon.flipX = false;
        } else if (scene.cursorKeys.right.isDown) {
            scene.playerDemon.setVelocityX(130 * scene.playerDemon.speeder);
            scene.playerDemon.flipX = true;
        } else if (scene.cursorKeys.up.isDown) {
            scene.playerDemon.setVelocityY(-130 * scene.playerDemon.speeder)
        } else if (scene.cursorKeys.left.isDown && scene.cursorKeys.up.isDown) {
            scene.playerDemon.setVelocity(-130 * scene.playerDemon.speeder, -130 * scene.playerDemon.speeder)
        } else if (scene.cursorKeys.right.isDown && scene.cursorKeys.up.isDown) {
            scene.playerDemon.setVelocity(130 * scene.playerDemon.speeder, -130 * scene.playerDemon.speeder)
        } else if (scene.cursorKeys.down.isDown) {
            scene.playerDemon.setVelocity(0, 150 * scene.playerDemon.speeder)
        } else if (scene.playerDemon.antiGrav){

            //want to add slight drag
            scene.playerDemon.setVelocity(0, 0);
            
        } else {
            scene.playerDemon.body.setDrag(100, 0)
        }
    }

    attackBasic() {
        const scene = this.scene;
        const player = scene.playerDemon;

        if (scene.cursorKeys.space.isDown && !this.isAttacking && this.alive) {
            scene.flameAudio.play();
            scene.playerDemon.play('demonAttack');
           setTimeout(() => {
               if (player.flipX) {
                   scene.attack = scene.attacks.create(player.x + 20, player.y + 20, `hitbox`)
                   scene.attack.body.setSize(100, 40)
                
               }  else {
                   scene.attack = scene.attacks.create(player.x - 20, player.y + 20, `hitbox`);
                   scene.attack.body.setSize(100, 40)
               }
           }, 300)
            this.isAttacking = true;
            scene.playerDemon.body.setSize(40, 90, true)
           //this.loseHealth()

            setTimeout(() => {
                scene.playerDemon.play('demonIdle');
                this.isAttacking = false;
                scene.playerDemon.body.setSize(40, 90, true)
                scene.attack.destroy();

            }, 600)

            scene.playerDemon.body.setSize(40, 90, true)
        }
    }
    razorBladeAttack() {
       const pd = this.scene.playerDemon
        if (pd.razorMod === true && !this.razorCD && this.scene.cursorKeys.f.isDown) {
            pd.play('demonDamage')
            this.razorCD = true;
            console.log("RAZOR YOLO");
           let s;
            pd.flipX ? (s = 20) : (s = -20);

            const razorAtk = [this.scene.attacks.create(pd.x + parseInt(s), pd.y, `razor`), this.scene.attacks.create(pd.x + parseInt(s), pd.y, `razor`), this.scene.attacks.create(pd.x + parseInt(s), pd.y, `razor`)];
            razorAtk.forEach(rtk => {
                rtk.play('razorBlade');
                rtk.setVelocityX(s * 7);
                rtk.setBounce(0.5);
                this.scene.physics.add.collider(rtk, this.scene.platforms);
            })
            setTimeout(() => {
                pd.play('demonIdle');
            })
            setTimeout( () => {
                this.razorCD = false;
            }, 3000)
        }
    }
    createHealth() {
        const scene = this.scene;

        scene.health = scene.add.group({
            classType: Phaser.GameObjects.Image
        })
        scene.health.createMultiple({
            key: 'heart',
            setScale: {x: 0.1, y: 0.1},
            setXY: {x: 20, y: 20, stepX: 45},
            setScrollFactor: {x: 0, y: 0},
            quantity: 5,

        })
        scene.health.depth = 2;
    }

    loseHealth() {
        console.log('ya hit')
        if (this.alive && !this.attacked) {
            let test = this.scene.health.children.entries[this.hp -1];
            test.setPosition(-2000, -2000)
            this.hp -= 1;
            this.attacked = true
            this.scene.demoHitSound.play();
            this.scene.playerDemon.play('demonDamage');
            this.scene.playerDemon.body.setSize(60, 90, true)
            setTimeout(() => {
                this.attacked = false
                this.scene.playerDemon.play('demonIdle');
            }, 1000);

            if (this.hp <= 0 ) {
                this.alive = false;
                this.scene.pDeathAudio.play()
                this.scene.playerDemon.play('demonDeath');
                this.scene.trappingInJapan.stop();
                setTimeout(() => {
                    resetPlayerItemsOnDeath();
                }, 1000)
            }
        }

    }

}