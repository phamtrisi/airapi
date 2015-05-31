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

var search = require('./api/search'),
    info = require('./api/info'),
    availability = require('./api/availability'),
    reviews = require('./api/reviews'),
    income = require('./api/income');

module.exports = {
  search: search,
  info: info,
  availability: availability,
  reviews: reviews,
  income: income
};
