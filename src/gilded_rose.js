class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const ITEM_TYPE = {
  BRIE: 'Aged Brie',
  PASS: 'Backstage passes to a TAFKAL80ETC concert',
  HAND: 'Sulfuras, Hand of Ragnaros',
  CAKE: 'Conjured Mana Cake'
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  
  updateQuality() {
    // Loop through the array of items in the shop
    for (let i = 0; i < this.items.length; i++) {
      // If item is not 'Aged Brie' or 'Backstage passes'
      this.items[i].name !== ITEM_TYPE.BRIE && this.items[i].name !== ITEM_TYPE.PASS
      // Run qualityDecrease function
      ? this.qualityDecrease(i)
      // If item is 'Aged Brie' or 'Backstage passes' --> Run qualityIncrease function
      : this.qualityIncrease(i)
      // sellIn will always be decrease unless the name is 'Sulfuras, Hand of Ragnaros' --> Run sellInDecrease function
      this.sellInDecrease(i);
      // If sellIn is less than 0
      this.items[i].sellIn < 0 
      // Run sellInExpiredQualityUpdate function
      ? this.sellInExpiredQualityUpdate(i) 
      // Otherwise empty or undefined
      : null
    }
    // Return the array of items in the shop
    return this.items;
  }

  // Subtract 1 from the sellIn days if: 
  sellInDecrease(i) {
    // If item name is not 'Sulfuras, Hand of Ragnaros'
    this.items[i].name !== ITEM_TYPE.HAND 
    // Subtract 1 from the sellIn days value
    ? this.items[i].sellIn = this.items[i].sellIn - 1 
    // Otherwise empty or undefined
    : null;
  }

  // Subtract 1 from the quality of an item if:
  qualityDecrease(i) {
    // If the quality is greater than 0 AND If the item isn't 'Sulfuras, Hand of Ragnaros'
    this.items[i].quality > 0 && this.items[i].name !== ITEM_TYPE.HAND 
    // Subtract 1 from the quality
    ? this.items[i].quality = this.items[i].quality - 1
    // Otherwise empty or undefined
    : null;
    // If the quality is greater than 0 AND If the item isn't 'Conjured Mana Cake'
    this.items[i].quality > 0 && this.items[i].name === ITEM_TYPE.CAKE 
    // Subtract 1 from the quality
    ? this.items[i].quality = this.items[i].quality - 1
    // Otherwise empty or undefined
    : null;
 }

 // Add 1 to the quality of an item if:
  qualityIncrease(i) {
  //  If quality of item is less than 50
  if (this.items[i].quality < 50) {
    // Add 1 to quality
    this.items[i].quality = this.items[i].quality + 1;
    // If the item is 'Backstage passes' AND the sellIn day value is 10 or less AND quality is less than 50
    if (this.items[i].name === ITEM_TYPE.PASS && this.items[i].sellIn < 11 && this.items[i].quality < 50) {
          // Add 1 to the quality of item
          this.items[i].quality = this.items[i].quality + 1;
      }
      // If the sellIn day value is 5 or less AND quality is less than 50
      if (this.items[i].sellIn < 6 && this.items[i].quality < 50) {
        // Add 1 to quality
          this.items[i].quality = this.items[i].quality + 1;
        }
      }
    }
  
  sellInExpiredQualityUpdate(i) {
    // If item is not 'Aged Brie'
    if (this.items[i].name !== ITEM_TYPE.BRIE) {
        // If item has a quality greater than 0 AND item is not 'Sulfuras, Hand of Ragnaros' AND item is not 'Backstage passes'
        if (this.items[i].quality > 0 && this.items[i].name !== ITEM_TYPE.HAND && this.items[i].name !== ITEM_TYPE.PASS) {
            // Subtract 1 from quality
            this.items[i].quality = this.items[i].quality - 1;
        } else {
        // Holds quality from going negative or below 0
        this.items[i].quality = this.items[i].quality - this.items[i].quality;
      }
    } else {
      // For 'Aged Brie' and 'Backstage passes,' quality increased until it gets to 50
      if (this.items[i].quality < 50) {
        // Add 1 to quality
        this.items[i].quality = this.items[i].quality + 1;
      }
    }
  }
}

module.exports = {
  Item,
  Shop
}
