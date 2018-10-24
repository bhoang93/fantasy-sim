class treasure {
  constructor(name, equipment, stat, amt, value) {
    this.name = name;
    this.equipment = equipment;
    this.stat = stat;
    this.amt = amt;
    this.value = value;
  }
}

const gnomesHat = new treasure("Gnome's Hat", true, "def", 10, 100);

const treasureList = [gnomesHat];

export default treasureList;
