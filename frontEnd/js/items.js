class Items {
    constructor(scene) {
        this.scene = scene;
    }

    preLoad() {
        const s = this.scene;
        s.load.spritesheet('chest', 'assets/items/chest-idle.png', { frameWidth: 31, frameHeight: 23 });
        s.load.spritesheet('chestOpen', 'assets/items/chest-open.png', { frameWidth: 32, frameHeight: 23 });
    }

    create() {
        const invList = document.querySelector('#dom-inv');
        const s = this.scene;
        s.items = s.physics.add.group()
        buildAnimation('idleChest', 'chest',8, -1 , s);
        buildAnimation('chest-open', 'chestOpen',8, -1 , s);

    }

    spawn(x, y) {
        const invList = document.querySelector('#dom-inv');
        const s = this.scene;

        console.log(s.allItems)
        let chest =  s.items.create(x, y, `chest`)
        chest.body.setAllowGravity(false)
        chest.play('idleChest')
        chest.contents = s.allItems[Math.floor(Math.random() * s.allItems.length)];
        chest.setCollideWorldBounds(true);

        s.physics.add.collider(chest, s.platforms);

        s.physics.add.collider(chest, s.playerDemon, (chest) =>{
            let item = chest.contents;
            chest.contents = null;
            chest.destroy();
            s.itemPickup.play()
            fetch('http://localhost:3000/pickUP', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({item_id: item.id, user_id: demon.currentUser.id})
            })
                .then(r => r.json())
                .then(item => {
                    let ul = document.querySelector('#dom-inv');
                    if (ul) syncInv(ul);
                })

        //list-group-item d-flex justify-content-between align-items-center inventory-items
        })
    }
}