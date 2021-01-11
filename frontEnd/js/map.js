class MainMap {

    constructor(scene) {
        this.scene = scene;
    }

    preLoad() {
        const s = this.scene;
        s.load.image('map', 'assets/map.png');
        s.load.spritesheet('platform', 'assets/platform.png', { frameWidth: 300, frameHeight: 100 });
        s.load.spritesheet('top', 'assets/topInvis.png', { frameWidth: 300, frameHeight: 100 });
        s.load.spritesheet('side', 'assets/sideInvis.png', { frameWidth: 40, frameHeight: 300 });
        s.load.image('flameBar', 'assets/demonPlayer/fsBarr.png');
    }

    create() {
        const s = this.scene;
        s.map = s.add.sprite(0 , 0, 'map');
        s.map.setOrigin(0,0);
        s.platforms = s.physics.add.group();
        s.barriers = s.physics.add.group();
        s.flameSkullBarrier = s.physics.add.group();

        // this sets the physics size
        s.physics.world.bounds.width = s.map.width;
        s.physics.world.bounds.height = s.map.height;
        s.cameras.main.setBounds(0, 0, s.map.width, s.map.height);
        s.flameSkullBarrier.create(3000, 3200, 'flameBar').body.setAllowGravity(false).setImmovable(true);
    };
};