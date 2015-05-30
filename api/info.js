var request = require('request'),
  _ = require('lodash'),
  secrets = require('../_secrets'),
  configs = require('../configs'),
  serialize = require('../helpers/serialize');


/**
 * Get info for a particular hosting
 * @param  {Number, String} hosting - Hosting ID
 * @param  {Function} successCallback - Success callback to invoke
 * @param  {Function} failureCallback - Failure callback to invoke
 * @return {Void} - Hosting info is passed onto callbacks
 */
function info(hostingId, successCallback, failureCallback) {
  var requestConfigs = _.assign({}, configs.DEFAULT_REQUEST_CONFIGS, {
    url: configs.HOSTING_INFO_URL + '/' + hostingId + '?' + serialize(configs.DEFAULT_REQUEST_PARAMS)
  });

  // Make request to parse hosting info
  request(requestConfigs, function(err, res, body) {
    if (!err && res.statusCode == 200 && typeof successCallback === 'function') {
      successCallback(JSON.parse(body));
    } else if (err && typeof failureCallback === 'function') {
      failureCallback(err, res);
    }
  });
}

module.exports = info;