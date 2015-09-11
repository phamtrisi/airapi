var request = require('request'),
  _ = require('lodash'),
  configs = require('../configs'),
  serialize = require('../helpers/serialize'),
  Promise = require('bluebird');


/**
 * Get info for a particular hosting
 * @param  {Number, String} hosting - Hosting ID
 * @param  {Function} successCallback - Success callback to invoke
 * @param  {Function} failureCallback - Failure callback to invoke
 * @return {Void} - Hosting info is passed onto callbacks
 */
function getInfo(hostingId) {
  var requestConfigs = _.assign({}, configs.DEFAULT_REQUEST_CONFIGS, {
    url: configs.HOSTING_INFO_URL + '/' + hostingId + '?' + serialize(configs.DEFAULT_REQUEST_PARAMS)
  });

  return new Promise(function(resolve, reject) {
    // Make request to parse hosting info
    request(requestConfigs, function(err, res, body) {
      if (!err && res.statusCode == 200) {
        resolve(JSON.parse(body));
      } else if (err) {
        reject(err);
      }
    });
  });
}

module.exports = getInfo;
