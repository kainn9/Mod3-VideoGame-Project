# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.create(username: 'GarryMalarky', password: 'test123', yennies: 44523)
User.create(username: 'JohnMongomeryThe7th', password: 'test123', yennies: 3459)
User.create(username: 'Reevus', password: 'test123', yennies: 1290)
User.create(username: 'DingusPingus', password: 'test123', yennies: 34452)
User.create(username: 'CreepLurkingInTheShadows', password: 'test123', yennies: 6555)
User.create(username: 'GamerGuy54', password: 'test123', yennies: 3644)
User.create(username: 'RoflCopter22', password: 'test123', yennies: 9743)
User.create(username: 'hahaURmom277', password: 'test123', yennies: 67000)




# item seed
Item.create(name: 'Razor-Wind', description: 'Infinite Arrows, Flame +2', itemType: 'Weapon', value: 100)

Item.create(name: 'Deaths-Dance', description: 'League of Legends Item, LifeSteal +2', itemType: 'Weapon', value: 75)
Item.create(name: 'Razor Blade Orb(MOD)', description: 'You can fire a razor blade by pressing F', itemType: 'MOD', value: 3000)
Item.create(name: 'Anti Gravity Orb(MOD)', description: 'Gravity No longer bothers you!', itemType: 'MOD', value: 2400)
Item.create(name: 'Quick Escape(click x to escape)', description: 'It is rought out here!!!', itemType: 'Consumable', value: 300)
Item.create(name: 'Speed Orb(MOD)', description: 'GOTTA GO FAST', itemType: 'MOD', value: 1400)

Item.create(name: 'Cana Tuna', description: 'Solid White Albacore, packed in water.', itemType: 'Loot', value: 5)
Item.create(name: 'Cursed Necklace', description: 'We should sell this ASAP', itemType: 'Loot', value: 85)
Item.create(name: 'Old Knights Helmet', description: 'Old rusty helmet, still has the emblem of the templars', itemType: 'Loot', value: 75)
Item.create(name: 'Skull of Human', description: 'Maybe I can munch on this later', itemType: 'Loot', value: 25)
Item.create(name: 'Spectral Cloth', description: 'A transparent cloth worn by ghosts', itemType: 'Loot', value: 66)
Item.create(name: 'Flint Stone', description: 'Good for starting a fire. But we already breathe fire...', itemType: 'Loot', value: 45)
Item.create(name: 'Creepy Doll', description: 'Perhaps for vodoo?', itemType: 'Loot', value: 45)
Item.create(name: 'Inscribed Robes', description: 'It bears the mark of ancient orders from the past', itemType: 'Loot', value: 95)

Item.create(name: 'Stinky Rotten Cheese', description: 'Even a demon would not consume this', itemType: 'Loot', value: -30)



Item.create(name: 'Silver Coin', description: 'Shiny and dirty, from the old times...', itemType: 'Loot', value: 50)
Item.create(name: 'Gold Coin', description: 'Solid Gold. Teeth marks are visible.', itemType: 'Loot', value: 100)
Item.create(name: 'Bit Coin', description: 'Legends say it has some sort of value....', itemType: 'Loot', value: 1)
Item.create(name: 'Silver Ingot', description: 'Solid Silver. Not worth its weight in gold.', itemType: 'Loot', value: 500)
Item.create(name: 'Gold Ingot', description: 'Dull Gold Bar. Extremely heavy, oddly attractive.', itemType: 'Loot', value: 1000)
Item.create(name: 'Wooden Toy Sword', description: 'Charred and splintered, I wonder how it got here.', itemType: 'Loot', value: 15)
Item.create(name: 'Ice Cream Cake', description: 'In the shape of a whale. Neapolitan. Sprinkles.', itemType: 'Loot', value: 25)
Item.create(name: 'Cubic Zirconium', description: 'Shines bright like a diamond.', itemType: 'Loot', value: 75)
Item.create(name: 'Rough Diamond', description: 'You can make out the gem. May be worth more after some polishing', itemType: 'Loot', value: 700)
