var request = require('request'),
  _ = require('lodash'),
  secrets = require('../_secrets'),
  cheerio = require('cheerio'),
  configs = require('../configs'),
  serialize = require('../helpers/serialize'),
  DEFAULT_REVIEWS_PARAMS = _.assign({}, configs.DEFAULT_REQUEST_PARAMS, {
    page: 1,
    role: 'host'
  });

/**
 * Get a list of textual reviews for a given user, as a host or a guest
 * @param  {Number, String} user - User ID
 * @param  {Object} options - Options to specify page and role of reviews
 * @param  {Function} successCallback
 * @param  {Function} failureCallback
 * @return {Void} - List of reviews is passed onto callbacks
 *
 * options = {
 *   page: {Number}, default 1
 *   role: {String}, Either 'guest' or 'host', default to 'host'
 * }
 */
function reviews(userId, options, successCallback, failureCallback) {
  var searchOptions = _.assign({}, DEFAULT_REVIEWS_PARAMS, options),
    requestConfigs = _.assign({}, configs.DEFAULT_REQUEST_CONFIGS, {
      url: configs.USER_REVIEWS_URL + '/' + userId + '?' + serialize(searchOptions)
    }),
    reviews = [],
    $;

  // Make request to get user reviews
  request(requestConfigs, function(err, res, body) {
    if (!err && res.statusCode == 200 && _.isFunction(successCallback)) {
      try {
        // Since the res is in HTML, parse with cheerio
        $ = cheerio.load(JSON.parse(body).review_content);

        // Construct list of textual reviews
        $('.comment-container .expandable-content p').each(function(idx, $review) {
          reviews.push($review.children[0].data);
        });

        // Invoke success callback
        successCallback(reviews);
      } catch (err) {
        if (_.isFunction(failureCallback)) {
          failureCallback(err, res);
        }
      }
    } else if (err && _.isFunction(failureCallback)) {
      failureCallback(err, res);
    }
  });
}

module.exports = reviews;