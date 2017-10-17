/* global describe it:true */
import chai from 'chai';
import _ from 'lodash/fp';
import CryptCurrencies from '../../../lib/constants/crypto_currencies';
import { DefaultCurrency } from '../../../lib/constants/currency';
import CryptoPriceTracker from '../../../lib/apis/crypto_price_tracker';

const { expect } = chai;

describe('CryptoPriceTracker', () => {
  describe('#getAllPrices()', () => {
    it('returns all valid prices from API calls', async () => {
      const prices = await CryptoPriceTracker.getAllPrices();
      expect(prices.length > 0).to.equal(true);
      expect(prices.length <= CryptCurrencies.length).to.equal(true);
      _.each((price) => {
        console.log('price', price);
        expect(price.target).to.equal(DefaultCurrency.toUpperCase());
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

    it('returns null when the related price record cannot be found', async () => {
      const price = await CryptoPriceTracker.getPriceOf('sjxc');
      console.log('sjxc price', price);
      expect(`${price}`).to.equal('null');
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
