var request = require('request'),
  _ = require('lodash'),
  cheerio = require('cheerio'),
  configs = require('../configs'),
  serialize = require('../helpers/serialize'),
  Promise = require('bluebird');

/**
 * Get a list of textual reviews for a given user, as a host or a guest
 * @param  {Number, String} user - User ID
 * @param  {Object} options - Options to specify page and role of reviews
 * @return {Promise} - contains list of reviews
 *
 * options = {
 *   page: {Number}, default 1
 *   role: {String}, Either 'guest' or 'host', default to 'host'
 * }
 */
function getReviews(userId, options) {
  var DEFAULT_REVIEWS_PARAMS = _.assign({}, configs.DEFAULT_REQUEST_PARAMS, {
      page: 1,
      role: 'host'
    }),
    searchOptions = _.assign({}, DEFAULT_REVIEWS_PARAMS, options),
    requestConfigs = _.assign({}, configs.DEFAULT_REQUEST_CONFIGS, {
      url: configs.USER_REVIEWS_URL + '/' + userId + '?' + serialize(searchOptions)
    }),
    reviews = [],
    $;

  return new Promise(function(resolve, reject) {
    if (!userId) {
      reject('Invalid user ID');
    }

    request(requestConfigs, function(err, res, body) {
      if (!err && res.statusCode == 200) {
        var data = JSON.parse(body);

        if (data.success) {
          try {
            // Since the res is in HTML, parse with cheerio
            $ = cheerio.load(JSON.parse(body).review_content);
            // Construct list of textual reviews
            $('.comment-container .expandable-content p').each(function(idx, $review) {
              reviews.push($review.children[0].data);
            });

            resolve(reviews);
          } catch (err) {
            reject(err);
          }
        }
        else {
          reject(data.error);
        }
      } else if (err) {
        reject(err);
      }
    });
  });

}

module.exports = getReviews;
