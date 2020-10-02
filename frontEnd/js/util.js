
const buildAnimation = (animName, spriteSrc, frameRate, repeat, scene) => {
    scene.anims.create({
        key: `${animName}`,
        frames: scene.anims.generateFrameNumbers(`${spriteSrc}`),
        frameRate: frameRate,
        repeat: repeat // -1 is a endless loop

    })
}

const gen = (xDiv, yDiv, scene) => {

    console.log('Scene Dimensions: ', scene.map.width, scene.map.height);
    //let i = 0;
    let x = 0;
    let y = 0;
    let xInc = scene.map.width / xDiv
    let yInc = scene.map.height /yDiv;
    console.log('Incrementer: ', xInc, yInc)

    //scene.platforms = scene.physics.add.physicsGroup();

    while (y <= scene.map.height - 400 ) {
        while(x <= scene.map.width ) {
            let xCord = Math.floor(Math.random() * (xInc * 0.75 + (xInc * 0.25))) + x;
            let yCord = Math.floor(Math.random() * (yInc * 0.75 + (yInc * 0.25)))  + y;

            //let platform = scene.physics.add.sprite(xCord, yCord, 'platform');
            let p = scene.platforms.create(xCord, yCord, 'platform').body.setAllowGravity(false).setImmovable(true);
            let it = scene.barriers.create(xCord, yCord -300, 'top').body.setAllowGravity(false).setImmovable(true);
            let is1 = scene.barriers.create(xCord - 160 , yCord - 130, 'side').body.setAllowGravity(false).setImmovable(true);
            let is2 = scene.barriers.create(xCord + 160 , yCord - 130, 'side').body.setAllowGravity(false).setImmovable(true);
            enemies.spawn(xCord, yCord);


            //scene.platforms.create(xCord, yCord, `platform`);
            console.log('created sprite at: ', xCord, yCord);

            x += xInc;
            //i++
        }
        x = 0;
        y += yInc;
    }
}

const loadBar = (scene) => {
    let progressBar = scene.add.graphics();
    let progressBox = scene.add.graphics();

    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    let width = scene.cameras.main.width;
    let height = scene.cameras.main.height;
    let loadingText = scene.make.text({
        x: width / 2,
        y: height / 2 - 50,
        text: 'Loading...',
        style: {
            font: '20px monospace',
            fill: '#ffffff'
        }
    });
    loadingText.setOrigin(0.5, 0.5);

    let percentText = scene.make.text({
        x: width / 2,
        y: height / 2 - 5,
        text: '0%',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
    });
    percentText.setOrigin(0.5, 0.5);

    let assetText = scene.make.text({
        x: width / 2,
        y: height / 2 + 50,
        text: '',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
    });

    assetText.setOrigin(0.5, 0.5);

    scene.load.on('progress', function (value) {
        percentText.setText(parseInt(value * 100) + '%');
        progressBar.clear();
        progressBar.fillStyle(0xffffff, 1);
        progressBar.fillRect(250, 280, 300 * value, 30);
    });

    scene.load.on('fileprogress', function (file) {
        assetText.setText('Loading asset: ' + file.key);
    });

    scene.load.on('complete', function () {
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
        assetText.destroy();

    });

    setTimeout(() => console.log('Loaded!'), 3500)

}

let mod = (sprite) => {
    sprite.antiGrav = false;
    sprite.razorMod = false;
    sprite.dropMod = false
    sprite.quickEscapeScroll = false;
    sprite.speeder = 1

    let playerInv = []
    let nodeVentory = document.querySelectorAll('.inventory-items');
    nodeVentory.forEach(li => {
        if (parseInt(li.dataset.id) === 102) sprite.razorMod = true;

        if (parseInt(li.dataset.id) === 103) sprite.antiGrav = true;

        if (parseInt(li.dataset.id) === 104) sprite.quickEscapeScroll = true;

        if (parseInt(li.dataset.id) === 105) sprite.speeder = 2;
    })
    playerInv = playerInv.filter(el => {
        return el !== 'X'
    })

    // if (playerInv.includes('Razor Blade Orb(MOD)'))
    //
    // if (playerInv.includes('Anti Gravity Orb(MOD)'))
    //
    // if (playerInv.includes('Quick Escape(click to escape)'))
    //
    // if (playerInv.includes('Speed Orb(MOD)'))
}

const areUBroke = (cost, cb) => {
    let test;
        fetch(`http://localhost:3000/users/${demon.currentUser.id}`)
            .then(r =>  r.json())
            .then( u => {
                let currentYens = u.data.attributes.yennies;

               if (cost >= parseInt(currentYens)) {
                   console.log('yaBroke')
                   test = u.data.attributes.yennies;
                   return true
               } else {
                   cb()
               }
            })


        console.log(test);
}

const purchase = (item_id) => {
        fetch('http://localhost:3000/inventories', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({item_id: item_id, user_id: demon.currentUser.id})
        })
        .then(r => r.json())
        .then(item => {
        })
}

let syncInv = (ul) => {
    fetch(`http://localhost:3000/users/${demon.currentUser.id}`)
        .then(r =>  r.json())
        .then( u => {
            let updatedInventory = u.data.attributes.items ;
            console.log('the ul: ', ul)
            for (let li of ul.querySelectorAll('li')) {
                li.remove();
            }
            //class : 'list-group-item d-flex justify-content-between align-items-center inventory-items'
            // btn class : 'badge badge-danger badge-pill' id: 'delete-button' x <span>

            for (let nItem of updatedInventory) {
                let nLi = document.createElement('li');
                nLi.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-center inventory-items');
                nLi.textContent = nItem.name;
                nLi.dataset.id = nItem.id;
                ul.appendChild(nLi);
                if (sceneManager.isShop === true) {
                    let redBtn = document.createElement('span');
                    redBtn.setAttribute('class', 'badge badge-danger badge-pill')
                    redBtn.textContent = 'x';
                    redBtn.id = 'delete-button'
                    nLi.appendChild(redBtn);
                }
            }
        })
}

const domYenniesSync = (num) => {
    let domYennies = document.querySelector('#user-yennies');
    if (domYennies)  {
        let y = parseInt(domYennies.textContent.split(' ')[1]);
        domYennies.textContent = `Yennies: ${y - num}`
    }
}

const consumeScroll = () => {
    fetch('http://localhost:3000/scroll', {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({user_id: demon.currentUser.id, item_id: 104})
    })
        .then( () => {

    })
}

const pullTop5 = () => {
    fetch('http://localhost:3000/rankings')
        .then(r => r.json())
        .then(top5 => {

            let first = top5[0];
            let second = top5[1]
            let third = top5[2];
            let fourth = top5[3]
            let fith = top5[4];

            let rankingDiv = document.createElement('div');
            let rankingDiv2 = document.createElement('div');
            rankingDiv2.innerHTML += `<div class="list-group"> `
            top5.forEach(u => {
                rankingDiv2.innerHTML += `
                  <a href="#" class="list-group-item list-group-item-action active">
                  <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">${u.username}</h5>
                </div>
                 <p class="mb-1">Yennies: ${u.yennies}</p>
                 </a>
                `
            })
            rankingDiv2.innerHTML += `</div>`;

            let htmlBuilOut =
                `<div class="list-group">
          <a href="#" class="list-group-item list-group-item-action active">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">${first.username}</h5>
            </div>
            <p class="mb-1">Yennies: ${first.yennies}</p>
          </a>
          
          <a href="#" class="list-group-item list-group-item-action">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">${second.username}</h5>
            </div>
            <p class="mb-1">Yennies: ${second.yennies}.</p>
          </a>
          <a href="#" class="list-group-item list-group-item-action">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">${third.username}</h5>
            </div>
            <p class="mb-1">${third.yennies}</p>
          </a>
        </div>`

            rankingDiv.innerHTML = htmlBuilOut;

            let mainCon = document.querySelector('#main-container')
            let top5r = document.querySelector('#top5ranks')

            if (top5r.innerText) {
                top5r.innerHTML = '';
                mainCon.style.display = 'block';
            } else {
                top5r.append(rankingDiv2)
                mainCon.style.display = 'none';
            }



        })
}

const razorBuy = () => {
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
    }
}

const escapeScrollBuy = () => {
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

const antiGravBuy = () => {
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

const speederBuy = () => {
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