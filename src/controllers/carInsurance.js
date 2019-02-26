class CarInsurance {
    
    constructor(products = []) {
      this.products = products;
      this.priceMax = 50;
      this.priceMin = 0;
    }

    setTopPrice(price) {
      return (price >= this.priceMax) ? this.priceMax : price;
    }

    setBottomPrice(price) {
      return (price <= this.priceMin) ? this.priceMin : price;
    }

    isDateExpiry(sellIn) {
      return sellIn < 0
    }

    decreasePrice(sellIn, beforeDateExpiry, afterDateExpiry) {
      return this.isDateExpiry(sellIn) ? afterDateExpiry : beforeDateExpiry;
    }

    increasePrice(sellIn, beforeDateExpiry, afterDateExpiry) {
      return this.isDateExpiry(sellIn) ? afterDateExpiry : beforeDateExpiry;
    }

    increasePriceDependingDay(sellIn) {
      if (sellIn < 10) {
        return this.increasePrice(sellIn, 2, 0)
      }
      if (sellIn < 5) {
        return this.increasePrice(sellIn, 3, 0)
      }
      return this.increasePrice(sellIn, 1, 2);
    }

    decreaseDate(sellIn) {
      return 1;
    }

    updatePrice() {
      for (var i = 0; i < this.products.length; i++) {

        switch(this.products[i].name) {
          case 'Mega Coverage':
            break;
          case 'Special Full Coverage':
            this.products[i].sellIn -= this.decreaseDate(this.products[i].sellIn);
            this.products[i].price  += this.increasePriceDependingDay(this.products[i].sellIn);
            this.products[i].price = this.setTopPrice(this.products[i].price);
            this.products[i].price = this.setBottomPrice(this.products[i].price);
        
            break;
          case 'Full Coverage':
            this.products[i].sellIn -= this.decreaseDate(this.products[i].sellIn);
            this.products[i].price  += this.increasePrice(this.products[i].sellIn, 1, 2);
            this.products[i].price = this.setTopPrice(this.products[i].price);
            this.products[i].price = this.setBottomPrice(this.products[i].price);
        
            break
          case 'Super Sale':
            this.products[i].sellIn -= this.decreaseDate(this.products[i].sellIn);
            this.products[i].price  -= this.decreasePrice(this.products[i].sellIn, 2, 2);
            this.products[i].price = this.setTopPrice(this.products[i].price);
            this.products[i].price = this.setBottomPrice(this.products[i].price);
            break
          
          default:
            this.products[i].sellIn -= this.decreaseDate(this.products[i].sellIn);
            this.products[i].price  -= this.decreasePrice(this.products[i].sellIn, 1, 2);
            this.products[i].price = this.setTopPrice(this.products[i].price);
            this.products[i].price = this.setBottomPrice(this.products[i].price);
        }

        
      }
  
      return this.products;
    }
  }
  
  module.exports = {
    CarInsurance
  }
  