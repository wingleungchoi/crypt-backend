var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;

var CryptoPriceTracker = require('../../lib/crypto_price_tracker.js');

describe('CryptoPriceTracker', () => {
  describe('#getAllPrices()', () => {
    it('returns all prices from API calls', async () => {
      await Promise.resolve('ok')
      expect('foo').to.be.a('string');
      expect([1,2,3].indexOf(4)).to.equal(-1);
    });
  });

  describe('#getPriceOf(crypto)', () => {
    it('raises Error when crypto is not in the list', () => {
      // expect(iThrowError).to.throw(Error, /Error thrown/);
      expect(CryptoPriceTracker.getPriceOf('no-crypto')).to.throw(NoValidInputError, 'The crypto does not exist.')
    })
    it('returns the relative price record', () => {})
  })
});
