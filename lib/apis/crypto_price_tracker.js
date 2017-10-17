import axios from 'axios';
import _ from 'lodash/fp';
import retryUtils from '../utils/retryUtils';
import { MaxAPICall } from '../constants/apis';
import CryptCurrencies from '../constants/crypto_currencies';
import { DefaultCurrency } from '../constants/currency';

const AllowedCrytoSlugs = _.map(c => c.slug, CryptCurrencies);

class CryptoPriceTracker {
  static async getAllPrices() {
    try {
      const prices = await Promise.all(_.map(async (slug) => {
        const price = await retryUtils.retry(
          async () => {
            const priceFromRetry = await CryptoPriceTracker.getPriceOf(slug);
            return priceFromRetry;
          },
          () => {
            throw new Error('The crypto api does not work.');
          },
          MaxAPICall,
        );
        return price;
      }, AllowedCrytoSlugs));
      return _.filter(p => _.get('base', p), prices);
    } catch (e) {
      throw new Error('The crypto api does not work.');
    }
  }

  static async getPriceOf(crypt, currency = DefaultCurrency) {
    if (!_.includes(crypt, AllowedCrytoSlugs)) {
      // invalid crypt input
      throw new Error('The crypto does not exist.');
    } else {
      const res = await axios({
        method: 'get',
        url: `https://api.cryptonator.com/api/ticker/${crypt}-${currency.toLowerCase()}`,
        responseType: 'json',
      });
      if (res.data.success) {
        const price = res.data.ticker;
        return price;
      }
      return null;
    }
  }
}

export default CryptoPriceTracker;
