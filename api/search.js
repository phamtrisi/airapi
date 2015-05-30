var request = require('request'),
  _ = require('lodash'),
  secrets = require('../_secrets'),
  configs = require('../configs'),
  serialize = require('../helpers/serialize');

/**
 * Search hostings
 * @param  {Object} options - Search options
 * @param  {Function} successCallback(err, res, listings) - Callback to invoke if successful 
 * @param  {Function} failureCallback(err, res) - Callback to invoke if failed 
 * @return {Void} - List of found hostings is passed through callbacks
 *
 * Available options 
 * options = {
 *   checkin: {String},
 *   checkout: {String},
 *   guests: {Number},
 *   page: {Number},
 *   location: {String}, e.g: 'New York, NY' or 'Seattle, WA'
 *   price_min: {Number},
 *   price_max: {Number},
 *   min_bedrooms: {Number},
 *   min_bathrooms: {Number},
 *   min_beds: {Number},
 *   superhost: {Boolean},
 *   hosting_amenities: {Array of id}, e.g: [1,4]
 *   property_type_id: {Array of id}, e.g: [1]
 *   languages: {Array of id}, e.g: [1,64]
 *   keywords: {String}, e.g: 'ocean,view,balcony'
 *   room_types: {Array}, e.g: ['Entire home/apt', 'Private room', 'Shared room']
 *   ib: {Boolean}, instant-book,
 *   neighborhoods: {Array}, e.g: ['Belltown', 'Queen Anne']
 * }
 */
function search(options, successCallback, failureCallback) {
  // Make sure search options is provided
  if (!options || !_.isObject(options)) {
    throw new Error('Must provide search options');
  }

  var requestConfigs = _.assign({}, configs.DEFAULT_REQUEST_CONFIGS, {
    url: configs.SEARCH_URL + '?' + serialize(options)
  }),
    hostings = [];

  // Make request
  request(requestConfigs, function(err, res, body) {
    if (!err && res.statusCode == 200 && _.isFunction(successCallback)) {
      body = JSON.parse(body);
      successCallback(body);
    } else if (err && _.isFunction(failureCallback)) {
      failureCallback(err, res);
    }
  });
}

module.exports = search;