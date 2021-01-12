# Flappy Demon
![](https://media.giphy.com/media/XSLu4igJjgndq2deQz/giphy.gif)

[Video Demo](https://www.loom.com/share/b659029c41c84001800721683f6ff357)

## Brief Summary: 
Flappy Bird is a web game/app designed in 1 week by Vlad(https://github.com/Vnapuri) and I! Our goal was to make a game that allowed users to fight for the top ranking by farming enemies for various item drops. Users can get lucky and get power up drops! Users can also click on items in their inventory to get more detailed information about them. Users can also sell their regular items to save enough currency(yennies) to buy power ups from the shop as well. The strongest enemies are at the top of the map. When the player enters the level a survial timer starts. If the player survives the duration of the timer they will be teleported back to the shop to sell their loot. However, if the user is defeated too early they will lose all their loot and lose the chance to sell for rankings/currency. This includes power up items. The level/mob placement is randomized unless the player re-enters after using an escape scroll. Under those circumstances the level retains its previous state.

## Installation:
* First, clone the project directory

  ### Backend Steps:
  * cd into folder 'backend'
  * run 'bundle install'
  * run 'rails db:create'
  * Note: if using WSL you may need to run 'sudo service postgresql start' prior to 'rails db:create'
  * DO NOT SKIP: run 'rails db:seed'
  * run 'rails s' to run the backend server

  ### Frontend Steps
  * cd into folder 'frontend'
  * run 'npm i'
  * run './node_modules/.bin/http-server -a localhost -p 8000 -c-1'
  * you should now be able play from: http://localhost:8000/

  
## Resources Used:
* https://rubyonrails.org/
* https://phaser.io/phaser3
### Game Assets:
* https://ansimuz.itch.io/gothicvania-patreon-collection
* https://mythril-age.itch.io/mythril-age-sfx-pack-v1?download
* https://ansimuz.itch.io/phaser-tutorial-excercise-sound?download
* https://edermunizz.itch.io/free-pixel-art-forest
* https://gamesupply.itch.io/massive-weapon-package
* https://www.youtube.com/watch?v=Mem9m1qyKAg
