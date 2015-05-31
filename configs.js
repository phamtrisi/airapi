var secrets = require('./_secrets'),
    _ = require('lodash');

var AIRBNB_PREFIX = 'https://www.airbnb.com',
    SEARCH_URL = AIRBNB_PREFIX + '/search/search_results',
    AVAILABILITY_URL = AIRBNB_PREFIX + '/api/v2/calendar_months',
    HOSTING_INFO_URL = AIRBNB_PREFIX + '/api/v1/listings',
    USER_REVIEWS_URL = AIRBNB_PREFIX + '/users/review_page',
    DEFAULT_REQUEST_CONFIGS = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
      }
    },
    DEFAULT_REQUEST_PARAMS = {
      key: secrets.API_KEY
    };

module.exports = {
  AIRBNB_PREFIX: AIRBNB_PREFIX,
  SEARCH_URL: SEARCH_URL,
  AVAILABILITY_URL: AVAILABILITY_URL,
  HOSTING_INFO_URL: HOSTING_INFO_URL,
  USER_REVIEWS_URL: USER_REVIEWS_URL,
  DEFAULT_REQUEST_CONFIGS: DEFAULT_REQUEST_CONFIGS,
  DEFAULT_REQUEST_PARAMS: DEFAULT_REQUEST_PARAMS
};
    