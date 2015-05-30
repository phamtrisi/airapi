/**
 * airbnb Node wrapper for unofficial API
 * @author Si Pham <phamtrisi@gmail.com>
 * 
 * Support basic actions to interact with airbnb hostings
 * - search() - Search for hostings given conditions
 * - info() - Get info about a hosting
 * - availability() - Get availability for a hosting
 * - income() - Get estimate income a hosting generates, by month
 * - reviews() - Get reviews for a given user, as host or guest
 */
var request = require('request'),
  _ = require('lodash'),
  cheerio = require('cheerio'),
  secrets = require('./_secrets');

var api = (function api() {
  var today = new Date(),
    tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000),
    API_KEY = secrets.API_KEY,
    DEFAULT_REQUEST_CONFIGS = secrets.DEFAULT_REQUEST_CONFIGS,
    DEFAULT_REQUEST_PARAMS = {
      key: API_KEY
    },
    DEFAULT_AVAILABILITY_PARAMS = _.assign({}, DEFAULT_REQUEST_PARAMS, {
      currency: 'USD',
      locale: 'en',
      month: today.getMonth() + 1,
      year: today.getFullYear(),
      count: 3,
      _format: 'with_conditions'
    }),
    DEFAULT_REVIEWS_PARAMS = _.assign({}, DEFAULT_REQUEST_PARAMS, {
      page: 1,
      role: 'host'
    }),
    AIRBNB_PREFIX = 'https://www.airbnb.com',
    SEARCH_URL = AIRBNB_PREFIX + '/search/search_results',
    AVAILABILITY_URL = AIRBNB_PREFIX + '/api/v2/calendar_months',
    HOSTING_INFO_URL = AIRBNB_PREFIX + '/api/v1/listings',
    USER_REVIEWS_URL = AIRBNB_PREFIX + '/users/review_page';

  /**
   * HELPERS
   */


  // Expose public methods
  return {
    income: income
  };
})();

module.exports = api;
