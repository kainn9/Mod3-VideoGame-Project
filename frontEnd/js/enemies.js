class Enemies {
    constructor(scene) {
        this.scene = scene
    }

    preLoad() {
        const s = this.scene
        // ghosts
        s.load.spritesheet('ghostEnemy', './assets/npcs/ghost/ghost-idle.png', { frameWidth: 64, frameHeight: 80 });
        s.load.spritesheet('ghostEnemyDamage', './assets/npcs/ghost/ghost-damage.png', { frameWidth: 64, frameHeight: 80 });
        s.load.spritesheet('ghostEnemyDeath', './assets/npcs/ghost/ghost-death.png', { frameWidth: 64, frameHeight: 64 });
        //skels
        s.load.spritesheet('skelEnemy', 'assets/npcs/skel/Skeleton Idle.png', { frameWidth: 22, frameHeight: 33 });
        s.load.spritesheet('skelEnemyDamage', 'assets/npcs/skel/Skeleton Hit.png', { frameWidth: 30, frameHeight: 32 });
        s.load.spritesheet('skelEnemyDeath', 'assets/npcs/skel/Skeleton Dead.png', { frameWidth: 33, frameHeight: 32 });
        s.load.spritesheet('fsk', 'assets/npcs/fsk/fsk.png/', { frameWidth: 96, frameHeight: 112 });
        s.load.spritesheet('fskEnemyDamage', 'assets/npcs/fsk/fsk.png/', { frameWidth: 96, frameHeight: 112 });
        s.load.spritesheet('fskEnemyDeath', 'assets/npcs/fsk/death.png/', { frameWidth: 128, frameHeight: 80 });
        this.scene.load.audio('eHitAudio', 'assets/npcs/hit.wav');
    }

    create() {
        const s = this.scene
        s.enemyMap = {
            ghosts: s.physics.add.group(),
            skels: s.physics.add.group(),
            fsk: s.physics.add.group(),
        }
        const enemyMap = s.enemyMap;
        // ghosts
        enemyMap.ghosts.spriteKey = 'ghostEnemy';
        buildAnimation('ghostEnemyIdle', 'ghostEnemy', 12, -1, s);
        buildAnimation('ghostEnemyDamage', 'ghostEnemyDamage', 6, 0, s);
        buildAnimation('ghostEnemyDeath', 'ghostEnemyDeath', 12, 3, s);
        this.loseHealth(enemyMap.ghosts, 3);

        enemyMap.fsk.spriteKey = 'fsk';
        buildAnimation('fsk', 'fsk', 12, -1, s);
        buildAnimation('fskDeath', 'fskEnemyDeath', 12, -1, s);
        this.loseHealth(enemyMap.fsk, 1)





        enemyMap.skels.spriteKey = 'skelEnemy';
        buildAnimation('skelEnemyIdle', 'skelEnemy', 12, -1, s);
        buildAnimation('skelEnemyDamage', 'skelEnemyDamage', 12, 0, s);
        buildAnimation('skelEnemyDeath', 'skelEnemyDeath', 30, 0, s);
        //s.physics.add.collider(enemyMap.skels, s.platforms);
        this.loseHealth(enemyMap.skels, 1);


        this.scene.eHitSound = this.scene.sound.add('eHitAudio');
        //enemyMap.ghosts.create(3000, 6000, enemyMap.skel.spriteKey);
    }
    fskSpawn() {
        const s = this.scene
        for (let i = 0; i < 60; i++) {
            let fsk = s.enemyMap.fsk.create(Math.floor(Math.random() * 6000), Math.floor(Math.random() * 3000), 'fsk');
            fsk.play('fsk');
            fsk.setBounce(1);
            fsk.setVelocityX(Math.floor((Math.random() * 80) + (70)))
            fsk.setVelocityY(Math.floor((Math.random() * 80) + (70)))
            fsk.setCollideWorldBounds(true);
            s.physics.add.collider(fsk, s.flameSkullBarrier, () => {
                fsk.flipX = !fsk.flipX;
            })
            s.physics.add.collider(fsk, s.playerDemon, () => {
                demon.loseHealth()
                fsk.play('fskDeath')
                setTimeout(() => {

                    fsk.destroy();
                }, 500)
            })

        }



    }
    spawn(x, y) {
        const s = this.scene
        const enArr = ['skels' , 'ghosts']
        let eSpawn = enArr[Math.floor(Math.random() * enArr.length)]
        let e = s.enemyMap[eSpawn].create(x, y - 60, s.enemyMap[eSpawn].spriteKey);
        e.play(`${s.enemyMap[eSpawn].spriteKey}Idle`);
        e.setScale(1.4);
        e.setBounce(1);
        e.setSize(20, 40, true)
        e.setVelocityX(Math.floor((Math.random() * 220) + (100)))
        if (s.enemyMap[eSpawn].spriteKey === 'ghostEnemy') e.setVelocityY(Math.floor(Math.random() * 50 + 100))
        s.physics.add.collider(e, s.platforms);
        s.physics.add.collider(e, s.barriers, () => {
            e.flipX = !e.flipX;
        });

        s.physics.add.collider(e, s.playerDemon, () => {
            let velo;
            e.flipX ? (velo = 200) : (velo = -200);
            e.setVelocityX(velo);
            demon.loseHealth()
        })

    }


    loseHealth(enemyMapGroup, totalHealth) {

        const s = this.scene;
        s.physics.add.overlap(enemyMapGroup, s.attacks, (g) => {
            if (!g.isHit) {

                let velo;
                g.flipX ? (velo = 300) : (velo = -300);
                g.setVelocityX(velo);

                g.play(`${enemyMapGroup.spriteKey}Damage`)
                g.totalHealth ? (g.totalHealth -= 1) : (g.totalHealth = totalHealth - 1);
                g.isHit = true;
                console.log('enemy has this much health left: ', g.totalHealth);
                if (g.totalHealth <= 0){
                    console.log(`${enemyMapGroup.spriteKey}Death`)
                    g.play(`${enemyMapGroup.spriteKey}Death`)
                    s.eHitSound.play()
                    g.body.setSize(1,1)
                    setTimeout(() => {
                        superItems.spawn(g.x, g.y)                ;
                        g.destroy()
                    }, 600);
                }
                setTimeout(() => {
                    if (g.totalHealth) {
                        g.play(`${enemyMapGroup.spriteKey}Idle`)
                        g.isHit = false;
                    }
                }, 600)

            }
        })
    }
}