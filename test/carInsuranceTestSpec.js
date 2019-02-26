const expect = require('chai').expect;

const controllers = require('../src/controllers/carInsurance');
const CarInsurance = controllers.CarInsurance;

const models = require('../src/models/Product');
const Product = models.Product;

describe("CarInsurance", () => {

  it("should return the price correct  when exceeds the allowed range", () => {
    const coTest = new CarInsurance([]);

    const priceOverflow = coTest.setTopPrice(80);
    expect(priceOverflow).equal(coTest.priceMax);

    const priceNormalTop = coTest.setTopPrice(10);
    expect(priceNormalTop).equal(10);

    const priceUnderflow = coTest.setBottomPrice(-2);
    expect(priceUnderflow).equal(coTest.priceMin);

    const priceNormalBottom = coTest.setBottomPrice(20);
    expect(priceNormalBottom).equal(20);
  });

  it("should verify date of Expiry", () => {
    const coTest = new CarInsurance([]);

    const isAfterDateExpiry = coTest.isDateExpiry(-1);
    expect(isAfterDateExpiry).equal(true);

    const isBeforeDateExpiry = coTest.isDateExpiry(1);
    expect(isBeforeDateExpiry).equal(false);

    const isDateExpiryNeutral = coTest.isDateExpiry(0);
    expect(isDateExpiryNeutral).equal(true);
  });

});
