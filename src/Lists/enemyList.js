import treasureList from "./treasureList";

class enemy {
  constructor(name, str, treasure, treasureChance, loot) {
    this.name = name;
    this.str = str;
    this.treasure = treasure;
    this.treasureChance = treasureChance;
    this.loot = loot;
  }
}

//Name, Strength, Treasure, Treasure Droprate, Gold
const rat = new enemy("Rat", 1, "none", 100, 10);
const goblin = new enemy("Goblin", 5, "none", 100, 50);
const treasureGnome = new enemy("Treasure Gnome", 0, treasureList[0], 0, 50);

const enemyList = [rat, goblin, treasureGnome];

export default enemyList;
