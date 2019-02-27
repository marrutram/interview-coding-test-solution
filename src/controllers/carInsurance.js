class CarInsurance {
    
    constructor(products = [], priceMax = 50, priceMin = 0, amountDaysDecrease = 1) {
      this.products = products;
      this.priceMax = priceMax;
      this.priceMin = priceMin;
      this.amountDaysDecrease = amountDaysDecrease;
    }

    setTopPrice(price) {
      return (price >= this.priceMax) ? this.priceMax : price;
    }

    setBottomPrice(price) {
      return (price <= this.priceMin) ? this.priceMin : price;
    }

    isSellbyDate(sellIn) {
      return sellIn <= 0
    }

    getPriceDependingDate(sellIn, beforeSellbyDate, afterSellbyDate) {
      return this.isSellbyDate(sellIn) ? afterSellbyDate : beforeSellbyDate;
    }

    getIncreasePriceDependingDay(sellIn) {
      if (sellIn <= 5) {
        return this.getPriceDependingDate(sellIn, 3, 0)
      }
      if (sellIn <= 10) {
        return this.getPriceDependingDate(sellIn, 2, 0)
      }
      return this.getPriceDependingDate(sellIn, 1, 0);
    }

    updatePrice() {
      for (var i = 0; i < this.products.length; i++) {

        switch(this.products[i].name) {
          case 'Mega Coverage':
            break;
          case 'Special Full Coverage':
            const newPrice = this.getIncreasePriceDependingDay(this.products[i].sellIn);;
            if (newPrice === 0) {
              this.products[i].price = 0;
            } else {
              this.products[i].price += this.getIncreasePriceDependingDay(this.products[i].sellIn);
            }
            this.products[i].price = this.setTopPrice(this.products[i].price);
            this.products[i].price = this.setBottomPrice(this.products[i].price);
            this.products[i].sellIn -= this.amountDaysDecrease;
            break;
          case 'Full Coverage':
            this.products[i].price  += this.getPriceDependingDate(this.products[i].sellIn, 1, 2);
            this.products[i].price = this.setTopPrice(this.products[i].price);
            this.products[i].price = this.setBottomPrice(this.products[i].price);
            this.products[i].sellIn -= this.amountDaysDecrease;
            break
          case 'Super Sale':
            this.products[i].price  -= this.getPriceDependingDate(this.products[i].sellIn, 2, 2);
            this.products[i].price = this.setTopPrice(this.products[i].price);
            this.products[i].price = this.setBottomPrice(this.products[i].price);
            this.products[i].sellIn -= this.amountDaysDecrease;
            break
          
          default:
            this.products[i].price  -= this.getPriceDependingDate(this.products[i].sellIn, 1, 2);
            this.products[i].price = this.setTopPrice(this.products[i].price);
            this.products[i].price = this.setBottomPrice(this.products[i].price);
            this.products[i].sellIn -= this.amountDaysDecrease;
        }
      }
  
      return this.products;
    }
  }
  
  module.exports = {
    CarInsurance
  }
  