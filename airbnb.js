/**
 * airbnb Node wrapper for unofficial API
 * @author Si Pham <phamtrisi@gmail.com>
 *
 * Support basic actions to interact with airbnb hostings
 * - search() - Search for hostings given conditions
 * - getInfo() - Get info about a hosting
 * - getCalendar() - Get availability for a hosting
 * - getEstIncome() - Get estimate income a hosting generates, by month
 * - getReviews() - Get reviews for a given user, as host or guest
 * - getListingReviews() - Get reviews for a given listing id
 */

var search = require('./api/search'),
    getInfo = require('./api/getInfo'),
    getCalendar = require('./api/getCalendar'),
    getReviews = require('./api/getReviews'),
    getEstIncome = require('./api/getEstIncome'),
    getListingReviews = require('./api/getListingReviews'),
    login = require('./api/login');

var USERNAME = 'username',
    PASSWORD = 'password';

var AirbnbClient = function(optionalConfigs) {
  optionalConfigs = optionalConfigs || {};

  return {
    configs: optionalConfigs,
    search: search,
    getInfo: getInfo,
    getCalendar: getCalendar,
    getReviews: getReviews,
    getEstIncome: getEstIncome,
    getListingReviews: getListingReviews,
    login: login
  };
};

module.exports = AirbnbClient;
