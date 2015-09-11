var request = require('request'),
  _ = require('lodash'),
  configs = require('../configs'),
  serialize = require('../helpers/serialize'),
  Promise = require('bluebird');

/**
 * Get calendar for a given hosting ID
 * @param  {[Number/String]} hosting ID         [description]
 * @param  {[Object]} options         [description]
 * @param  {Function} successCallback(err, res, info) - Callback to invoke if successful 
 * @param  {Function} failureCallback(err, res) - Callback to invoke if failed 
 * @return {Void} - Listing info is passed through callbacks
 *
 * Available options
 * options = {
 *   key: {String}, provide your own API key if you have, otherwise leave this as default
 *   currency: {String}, e.g: 'USD' or 'VND'
 *   locale: {String}, e.g: 'en'
 *   month: {Number/String}, 1-based. E.g: July = 7
 *   year: {Number/String},
 *   count: {Number}, // Get <x> months of availabilities starting at <month>
 * }
 */
function getCalendar(hostingId, options) {
  var today = new Date(),
    DEFAULT_AVAILABILITY_PARAMS = _.assign({}, configs.DEFAULT_REQUEST_PARAMS, {
      currency: 'USD',
      locale: 'en',
      month: today.getMonth() + 1,
      year: today.getFullYear(),
      count: 3,
      _format: 'with_conditions'
    });

  return new Promise(function(resolve, reject) {
    
    // Make sure we have enough params to continue
    if (arguments.length < 2) {
      reject('Must provide hosting ID and search options');
    }

    if (!_.isNumber(hostingId) &&
      !_.isString(hostingId)) {
      reject('Hosting ID must be string or int');
    }

    var searchOptions = _.assign({
        listing_id: hostingId
      }, DEFAULT_AVAILABILITY_PARAMS, options),
      requestConfigs = _.assign({}, configs.DEFAULT_REQUEST_CONFIGS, {
        url: configs.AVAILABILITY_URL + '?' + serialize(searchOptions)
      });

    // Make request
    request(requestConfigs, function(err, res, body) {
      if (!err && res.statusCode == 200) {
        resolve(JSON.parse(body));
      } else if (err) {
        reject(err);
      }
    });
  });
}

module.exports = getCalendar;
