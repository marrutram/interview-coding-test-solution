const expect = require('chai').expect;

const controllers = require('../src/controllers/carInsurance');
const CarInsurance = controllers.CarInsurance;

const models = require('../src/models/Product');
const Product = models.Product;

describe("CarInsurance", () => {
  const coTest = new CarInsurance([]);

  it("should return the price correct  when exceeds the allowed range", () => {

    const priceOverflow = coTest.setTopPrice(80);
    expect(priceOverflow).equal(coTest.priceMax);

    const priceNormalTop = coTest.setTopPrice(10);
    expect(priceNormalTop).equal(10);

    const priceUnderflow = coTest.setBottomPrice(-2);
    expect(priceUnderflow).equal(coTest.priceMin);

    const priceNormalBottom = coTest.setBottomPrice(20);
    expect(priceNormalBottom).equal(20);
  });

  it("should verify sell by date", () => {

    const isAfterSellbyDate = coTest.isSellbyDate(-1);
    expect(isAfterSellbyDate).equal(true);

    const isBeforeSellbyDate = coTest.isSellbyDate(1);
    expect(isBeforeSellbyDate).equal(false);

    const isSellbyDateNeutral = coTest.isSellbyDate(0);
    expect(isSellbyDateNeutral).equal(true);
  });

  describe("the price depending the sell by date", () => {

    it("should return price specified afterSellbyDate", () => {
      const sellIn = -1;
      const beforeSellbyDate = 1;
      const afterSellbyDate = 2;
      const getPriceDependingDate = coTest.getPriceDependingDate(sellIn, beforeSellbyDate, afterSellbyDate);
      expect(getPriceDependingDate).equal(afterSellbyDate);
    });

    it("should return  amount specified beforeSellbyDate", () => {
      const sellIn = 5;
      const beforeSellbyDate = 1;
      const afterSellbyDate = 2;
      const getPriceDependingDate = coTest.getPriceDependingDate(sellIn, beforeSellbyDate, afterSellbyDate);
      expect(getPriceDependingDate).equal(beforeSellbyDate);
    });
  })

  describe("the Price depending the quantity days sellIn", () => {

    it("should return price specified for the quantity 9 days sellIn", () => {
      const sellIn = 9;

      const getPriceDependingDate = coTest.getIncreasePriceDependingDay(sellIn);
      expect(getPriceDependingDate).equal(2);
    });

    it("should return price specified for the quantity 4 days sellIn", () => {
      const sellIn = 4;
 
      const getPriceDependingDate = coTest.getIncreasePriceDependingDay(sellIn);
      expect(getPriceDependingDate).equal(3);
    });

    it("should return price specified for the quantity 20 days sellIn", () => {
      const sellIn = 20;
 
      const getPriceDependingDate = coTest.getIncreasePriceDependingDay(sellIn);
      expect(getPriceDependingDate).equal(1);
    });

  })
  
  describe("update price", () => {

    it("should return price degrades twice as fast, once the sell by date has passed", () => {
      
      const productsAtDayZero = [
        new Product('Medium Coverage', 0, 10),
        new Product('Super Sale', 0, 6),
      ];

      const productMediumCoverage = new CarInsurance(productsAtDayZero)
      const updateProduct = productMediumCoverage.updatePrice();
      expect(updateProduct[0].price).equal(8);
      expect(updateProduct[1].price).equal(4);
    })

    it("should verify the price of a product is never negative", () => {
      
      const productsAtDayZero = [
        new Product('Medium Coverage', 10, -2)
      ];

      const productMediumCoverage = new CarInsurance(productsAtDayZero)
      const updateProduct = productMediumCoverage.updatePrice();

      expect(updateProduct[0].price).equal(0);
    })


    it("should verify the product 'Full Coverage' actually increases in price the older it gets and the price of a product is never more than 50.", () => {
      
      const productsAtDayZero = [
        new Product('Full Coverage', 2, 0),
        new Product('Full Coverage', 10, 50)
      ];

      const productMediumCoverage = new CarInsurance(productsAtDayZero)
      const updateProduct = productMediumCoverage.updatePrice();

      expect(updateProduct[0].price).equal(1);
      expect(updateProduct[1].price).equal(50);
    })

    it("should verify the product 'Mega Coverage', being a legendary product, never has to be sold or decreases in price", () => {
      
      const productsAtDayZero = [
        new Product('Mega Coverage', 0, 80),
        new Product('Mega Coverage', -1, 80)
      ];

      const productMediumCoverage = new CarInsurance(productsAtDayZero)
      const updateProduct = productMediumCoverage.updatePrice();

      expect(updateProduct[0].price).equal(80);
      expect(updateProduct[1].price).equal(80);
    })

    it("should verify the product 'Special Full Coverage', like full coverage, increases in price as its sellIn value approaches: price increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but. price drops to 0 when no more days left (and the product is not valid anymore", () => {
      const productsAtDayZero = [
        new Product('Special Full Coverage', 15, 20),
        new Product('Special Full Coverage', 10, 20),
        new Product('Special Full Coverage', 5, 20),
        new Product('Special Full Coverage', 0, 20),
      ];

      const productMediumCoverage = new CarInsurance(productsAtDayZero)
      const updateProduct = productMediumCoverage.updatePrice();
      expect(updateProduct[0].price).equal(21);
      expect(updateProduct[1].price).equal(22);
      expect(updateProduct[2].price).equal(23);
      expect(updateProduct[3].price).equal(0);
    })

    it("should verify the product 'Super Sale' Products degrade in price twice as fast as normal Products", () => {
      const productsAtDayZero = [
        new Product('Super Sale', 10, 5),
        new Product('Super Sale', 0, 5)
      ];

      const productMediumCoverage = new CarInsurance(productsAtDayZero)
      const updateProduct = productMediumCoverage.updatePrice();
      expect(updateProduct[0].price).equal(3);
      expect(updateProduct[1].price).equal(3);
    })
    
  })
  
});
