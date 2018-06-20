var request = require('request'),
  _ = require('lodash'),
  configs = require('../configs/configs'),
  serialize = require('../helpers/serialize'),
  Promise = require('bluebird');

/**
 * Get a list of reviews for a given listing id, as all. Details: http://airbnbapi.org/#get-reviews
 * @param  {Number, String} listingId
 * @param  {Object} options - Options to specify _limit, _offset, etc.
 * @return {Promise} - contains list of reviews
 *
 * options = {
 *   _limit: {Number}, default 50 (max 50)
 *   _offset: {Number}, default 0
 *   locale: {String}, default 'en'
 *   _order: {String}, default 'language'
 *   role: {String}, default  'all'
 * }
 */
function getListingReviews(listingId, options) {
  options.listing_id = listingId;
  var DEFAULT_LISTING_REVIEWS_PARAMS = _.assign({}, configs.DEFAULT_REQUEST_PARAMS, {
      _limit: 50,
      _offset: 0,
      locale: 'en',
      _order: 'language',
      role: 'all'
    }),
    searchOptions = _.assign({}, DEFAULT_LISTING_REVIEWS_PARAMS, options),
    requestConfigs = _.assign({}, configs.DEFAULT_REQUEST_CONFIGS, {
      url: configs.LISTING_REVIEWS_URL + '?' + serialize(searchOptions)
    }),
    reviews = [],
    $;

  return new Promise(function(resolve, reject) {
    if (!listingId) {
      reject('Invalid listing ID');
    }

    request(requestConfigs, function(err, res, body) {
      body = JSON.parse(body);
      if (!err && res.statusCode == 200) {
        if (body.error_code){
          return reject(body.error_details);
        }
        resolve(body.reviews);
      } else if (err) {
        reject(err);
      }
    });
  });

}

module.exports = getListingReviews;
