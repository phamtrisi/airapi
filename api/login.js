var request = require('request'),
  _ = require('lodash'),
  configs = require('../configs/configs'),
  serialize = require('../helpers/serialize'),
  Promise = require('bluebird');


function login() {
  var _this = this,
    username = _this.configs.username,
    password = _this.configs.password,
    requestConfigs = _.assign({}, configs.DEFAULT_REQUEST_CONFIGS, {
      url: configs.LOGIN_URL,
      json: true,
      body: {
        username: username,
        password: password,
        grant_type: 'password',
          key: configs.DEFAULT_REQUEST_PARAMS.key
      },
      method: 'POST'
    });

  return new Promise(function(resolve, reject) {
    // Make request to parse hosting info
    request(requestConfigs, function(err, res, body) {
      if (!err && res.statusCode == 200 && body.hasOwnProperty('access_token')) {
        _this.accessToken = body.access_token;
        resolve(body.access_token);
      } else if (err) {
        reject(err);
      }
    });
  });
}

module.exports = login;
