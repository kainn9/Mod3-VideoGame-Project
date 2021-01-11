let sceneManager = new SceneManager('collectorGame');
let demon = new DemonPlayer(sceneManager.mainScene);
let map = new MainMap(sceneManager.mainScene);
let enemies = new Enemies(sceneManager.mainScene);
let superItems = new Items(sceneManager.mainScene);

let elRestarto = {
    
    reload: false,
    rListener: function(val) {},
    set r(val) {
        this.reload = val;
        this.rListener(val);
    },
    get r() {
        return this.reload;
    },
    registerListener: function(listener) {
        this.rListener = listener;
    }
};

let gameConfig = {

    type: Phaser.AUTO,
    width: 800,
    height: 600,
    title: 'Demon Collector',
    backgroundColor: 'purple',
    scene: [sceneManager.shopScene, sceneManager.menuScreen, sceneManager.mainScene, sceneManager.endScene],
    parent: 'demonBoi',
    dom: {
        createContainer: true
    },
    physics: {
        default: "arcade",
        arcade: {

            gravity: { y: 80 },
            debug: false
        }
    }
};


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// RenderShop Function
const renderShop = () => {

    const inventory = document.getElementById('dom-inv');

    for (let counter = 0; counter < inventory.children.length; counter++) {
        const item = inventory.children[counter];
    };
};

const survivor = (user, inv) => {

    let itemIds = inv.map(item => item.id);

    Promise.all([
        fetch(`http://localhost:3000/users/${user.id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({level: user.level, yennies: user.yennies})
        }),
        fetch('http://localhost:3000/survivor', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({user_id: user.id, item_ids: itemIds})
        })
    ])
    .then(resps => Promise.all(resps.map(resp => resp.json())))
    .then(data => {

        demon.scene.playerDemon.play('desc');

        setTimeout(() => {
            demon.scene.playerDemon.play('demonIdle');
            sceneManager.mainScene.scene.restart();
            demon.hp = 5;
            demon.alive = true;
            demon.scene.scene.switch(sceneManager.shopScene);
        }, 800)

    });
};

// Reset Player Items on Death
const resetPlayerItemsOnDeath = () => {

    fetch('http://localhost:3000/destroyInv', {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: demon.currentUser.id})
    })
    .then(resp => resp.json())
    .then(emptyInv => {

        let clearThisList = document.querySelectorAll('.inventory-items');

        clearThisList.forEach((li) => {
            li.remove();
        });
    });

    sceneManager.mainScene.scene.restart();
    demon.hp = 5;
    demon.alive = true;
    demon.scene.scene.switch(sceneManager.endScene);
    
};

// Populate the side bar functions
const popInventory = (character, sidebar) => {
    let sideWindow = document.getElementById('side-window');
    const invenList = document.querySelector('#dom-inv');

    for (let item of invenList.children) {
        item.remove();
    };

    const inventoryArray = character.attributes.items;
    for(let item of inventoryArray) {

        let itemLi = document.createElement('li');

        itemLi.innerHTML = `${item.name} <span class="badge badge-danger badge-pill" hidden="false" id='delete-button'>x</span>`;

        itemLi.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-center inventory-items');
        itemLi.setAttribute('data-id', `${item.id}`);
        invenList.append(itemLi);
    };

    sideWindow.append(invenList);
}

//remove btns
const rmvButtons = () => {

    let btns = document.querySelectorAll('#delete-button');
    btns.forEach( btn => btn.remove() );

};

const renderIteminfo = (itemObj) => {

    superItems.scene.allItems.forEach(indItem => {
     
       if (indItem.id === parseInt(itemObj.dataset.id)) {

            let itemInfo = document.getElementById('item-info');
            itemInfo.hidden = false;
    
            let cardName = document.getElementsByClassName('card-title')[0];
            cardName.textContent = indItem.name;

            let cardDesc = document.getElementById('card-desc');
            cardDesc.textContent = indItem.description;

            let cardValue = document.getElementById('card-value');
            cardValue.textContent = `Value:${indItem.value}`;

            let cardType = document.getElementById('card-type');
            cardType.textContent = `Type: ${indItem.itemType}`;
        };
    });
};

// Rendering the User Status Page
const renderStatus = () => {

    fetch(`http://localhost:3000/users/${demon.currentUser.id}`)
    .then(r =>  r.json())
    .then( u => {
        let currentYens = u.data.attributes.yennies;
        let sideBar = document.getElementById('side-bar');
        let statusWindow = document.createElement('div');
        statusWindow.setAttribute('class', 'card stat-window');

        statusWindow.innerHTML = `
            <img class="card-img-top" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c218a7a6-4373-4793-a36d-b653deb50c42/d9o979a-d95a7e14-1fb4-41b7-ab9d-34a6af9044e4.jpg/v1/fill/w_1024,h_1021,q_75,strp/ringwraith_by_stone_arazel_heart_d9o979a-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD0xMDIxIiwicGF0aCI6IlwvZlwvYzIxOGE3YTYtNDM3My00NzkzLWEzNmQtYjY1M2RlYjUwYzQyXC9kOW85NzlhLWQ5NWE3ZTE0LTFmYjQtNDFiNy1hYjlkLTM0YTZhZjkwNDRlNC5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.wy5ndgjgYsJagINKXPrGXvT3MetpfFAQc3oJwY1CyZg" alt="user-image">
            <div class="card-body">
            <h4 class="card-title"id='user-name'>Name ${demon.currentUser.username}</h4>
            <p class="card-text" id="user-yennies">Yennies: ${currentYens}</p>
            </div>
        `;

        sideBar.append(statusWindow);
    });
};


//  Creating the Main Game page/inventory navbar
const prepMainpage = (char) => {

    let timer = document.createElement('p');
    timer.id = 'timer';

    let mainDiv = document.querySelector('#main-container');
    mainDiv.appendChild(timer);
    let gameDiv = document.getElementById('demonBoi');
    gameDiv.setAttribute('class', 'row flex-row-reverse');

    let canvasElement = document.querySelector("#demonBoi > canvas");
    
    let sideBar = document.createElement('div');
    sideBar.setAttribute('class', 'col-3');
    sideBar.id = 'side-bar';
    sideBar.innerHTML =
    `
        <div class='side-bar' id= 'side-bar-tabs'>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button id='current-inv' type="button" class="btn btn-secondary">Inventory</button>
                <button id='player-stat' type="button" class="btn btn-secondary">Status</button>
            <button id='game-opt' type="button" class="btn btn-secondary">Mute</button>
            </div>
        </div>
        <div class="d-flex flex-column overflow-auto" hidden="false" id='side-window'>
            <ul id ='dom-inv' class="list-group"></ul>
        </div>
        <div class="card overflow-auto" hidden='true' id='item-info'>
        <div class="card-body" >
            <h4 class="card-title">Item Name</h4>
            <p class="card-text" id="card-desc">  Description    </p>
            <p class="card-text" id="card-value">   Value   </p>
            <p class="card-text"id="card-type">   Type   </p>
        </div>
        </div>
    `
    if (!elRestarto.r) gameDiv.append(sideBar);
    popInventory(char, sideBar);
};

// Initialize the Game Div/Canvas Element
const initGame = (char, allItems) => {
    const card0 = document.querySelector('div.card.card0');
    const card1 = document.querySelector('div.card.card1');
    const card2 = document.querySelector('div.card.card2');
    const mainC = document.getElementById('main-container');

    if (card0) {
        card0.setAttribute('class', 'none');
        card0.hidden = true;
        card1.hidden = true;
        card2.hidden = true;
        const gameDiv = document.createElement(`div`);
        gameDiv.id = 'demonBoi'
        mainC.append(gameDiv);
        mainC.append(gameDiv);
    };

    demon.scene.allItems = allItems;
    demon.inventory = char.attributes.items;
    demon.currentUser = char.attributes;

    if (!elRestarto.r) {

        let game = new Phaser.Game(gameConfig);
        sceneManager.initializeMenuScene()
        sceneManager.initializeMainScene(game);
        sceneManager.initializeEndScene();
        sceneManager.initializeShopScene();
        prepMainpage(char);
        demon.game = game;
        renderShop();
    };

};

const parseUser = (user) => {
    let character = {};
    character.attributes = user.data.attributes;
    return character;
};


let login = () => {
    const u = document.getElementById('email').value;
    const p = document.getElementById('psw').value;

    const serverConfig = {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }, body: JSON.stringify({username: `${u}`, password_digest: `${p}`})
    };

    Promise.all([
        fetch('http://localhost:3000/login', serverConfig),
        fetch('http://localhost:3000/items')
    ])
    .then( resps => Promise.all(resps.map( resp => resp.json())))
    .then(data => {

        const user = data[0];
        const allItems = data[1];

        if (user.error) {
            alert('Info Incorrect');
        } else {

            let char =  parseUser(user);
            initGame(char, allItems);

        };
    });
};

document.addEventListener('DOMContentLoaded', e => {

    document.addEventListener('click', e => {

        if (e.target.matches('#login-btn')) {

            login();

        } else if (e.target.innerText === 'Logout') {

            location.reload();
            return false;

        } else if (e.target.innerText === 'Status' && !document.querySelector('.card-img-top')) {

            let itemInfo = document.getElementById('item-info');
            itemInfo.hidden = true;
            let sWin = document.querySelector("#side-window");
            sceneManager.ph = sWin;
            sceneManager.parent = sWin.parentNode;
            sWin.remove();
            renderStatus();

        } else if (e.target.innerText === 'Inventory' && !document.querySelector('.list-group-item')) {
            let statusWin =  document.querySelector('.stat-window');

            if (statusWin) {

                sceneManager.status = statusWin;
                statusWin.remove();
        
            };

            sceneManager.parent.appendChild(sceneManager.ph);
            let theUL = sceneManager.ph.firstElementChild;
            syncInv(theUL);

            

        } else if (e.target.matches('.inventory-items')) {

            renderIteminfo(e.target);

        } else if (e.target.matches('#delete-button')) {

            let item = e.target.parentElement;
            let itemId = item.dataset.id;
           
            fetch('http://localhost:3000/deleteItem', {
                method: 'DELETE', 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({item_id: parseInt(itemId), user_id: demon.currentUser.id})
            })
            .then(resp => resp.json())
            .then(r => {
                let yennies = r.yennies;
                item.remove();
                if (document.querySelector('#user-yennies')) document.querySelector('#user-yennies').textContent = `Yennies: ${demon.currentUser.yennies}`;
            });

        } else if (e.target.textContent === 'Rankings') {
            pullTop5();
        } else if (e.target.innerText === 'Mute') {

            let dsMusic = demon.scene.trappingInJapan;

            switch(dsMusic.isPlaying) {
                case true:
                    demon.scene.sound.setMute(true);
                    dsMusic.pause();
                break;

                case false:
                    demon.scene.sound.setMute(false);
                    dsMusic.play();
                break;
            };
        };
    });

    elRestarto.registerListener(function(val) {
        login();
    });
});
