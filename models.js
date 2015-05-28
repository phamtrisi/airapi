var airbnb = require('./airbnb');

var Hosting = function(id) {
  // Private vars
  var _id = id;

  this.getId = function() {
    return _id;
  };

};

Hosting.prototype.getInfo = function(successCallback, failureCallback) {
  var hosting = this,
      NOW = new Date().getTime(),
      MEMOIZE_TIME = 5 * 60 * 1000 * 1000; // Only make a new call if last time we got this info is more than 5 mins ago

  if (!hosting._info || (hosting._info && NOW > hosting._info.lastUpdated + MEMOIZE_TIME)) {
    airbnb.info(hosting.getId(), function success(err, res, info) {
      hosting._info = {
        lastUpdated: new Date().getTime(),
        info: info
      };

      if (successCallback) {
        successCallback(hosting._info.info);
      }
    }, function failure(err, res) {
      if (failureCallback) {
        failureCallback(err, res);
      }
    });
  }
  else {
    if (successCallback) {
      successCallback(hosting._info.info);
    }
  }
};

Hosting.prototype.getAvailability = function() {};

Hosting.prototype.getReviews = function() {};


module.exports = {
  Hosting: Hosting
};