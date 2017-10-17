/* global describe it:true */
import chai from 'chai';
import _ from 'lodash';
import CryptCurrencies from '../../../lib/constants/crypto_currencies';
import { DefaultCurrency } from '../../../lib/constants/currency';
import CryptoPriceTracker from '../../../lib/apis/crypto_price_tracker';

const { expect } = chai;

describe('CryptoPriceTracker', () => {
  describe('#getAllPrices()', () => {
    it('returns all prices from API calls', async () => {
      const prices = await CryptoPriceTracker.getAllPrices();
      expect(prices.length).to.equal(CryptCurrencies.length);
      _.each((price) => {
        expect(price.target).to.equal(DefaultCurrency);
        expect(price.change).to.be.a('string');
        expect(price.price).to.be.a('string');
        expect(price.volume).to.be.a('string');
      }, prices);
    });
  });

  describe('#getPriceOf(crypto)', () => {
    it('raises Error when crypto is not in the list', async () => {
      let err;
      try {
        await CryptoPriceTracker.getPriceOf('no-crypto');
      } catch (e) {
        err = e;
      }
      expect(err.message).to.equal('The crypto does not exist.');
    });
    it('returns the relative price record', async () => {
      const price = await CryptoPriceTracker.getPriceOf('btc');
      const expectedPrice = {
        base: 'BTC',
        target: 'USD',
      };
      expect(price.base).to.equal(expectedPrice.base);
      expect(price.target).to.equal(expectedPrice.target);
      expect(price.change).to.be.a('string');
      expect(price.price).to.be.a('string');
      expect(price.volume).to.be.a('string');
    }).timeout(5000);
  });
});
