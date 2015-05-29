var airbnb = require('../api'),
  _ = require('lodash');

var Hosting = (function(id, configs) {

  function Hosting(id, configs) {
    // Private vars
    var id = id,
      memoizeDuration = configs ? (configs.memoizeDuration || 0) : 0;

    // Public methods
    this.getId = function() {
      return id;
    };

    // Set amount of time the properties of this hosting
    // are cached before making a new request
    this.memoize = function(duration) {
      if (!(duration && _.isNumber(duration))) {
        return;
      }

      memoizeDuration = Math.abs(duration);
    };

    this.getMemoizeDuration = function() {
      return memoizeDuration;
    };

    this.clearMemoize = function() {
      memoizeDuration = 0;
    };
  }

  Hosting.prototype.getInfo = function(successCallback, failureCallback) {
    var hosting = this,
      now = new Date().getTime();

    // Only make a new call if we haven't OR the memoization has expired   
    if (!hosting.info ||
      (now > hosting.infoLastUpdated + hosting.getMemoizeDuration())) {
      airbnb.info(hosting.getId(), function success(hostingInfo) {
        // Update info for this hosting
        hosting.info = hostingInfo;

        // Update timestamp
        hosting.infoLastUpdated = new Date().getTime();

        // Invoke success callback
        if (_.isFunction(successCallback)) {
          successCallback(hosting.info);
        }
      }, function failure(err, res) {
        // Invoke failure callback if provided
        if (_.isFunction(failureCallback)) {
          failureCallback(err, res);
        }
      });
    }
    // Otherwise return from cache
    else {
      if (_.isFunction(successCallback)) {
        successCallback(hosting.info);
      }
    }
  };

  Hosting.prototype.getAvailability = function(options, successCallback, failureCallback) {
    var hosting = this,
      now = new Date().getTime();

    // Only make a new call if we haven't OR the memoization has expired   
    if (!hosting.availability ||
      (now > hosting.availabilityLastUpdated + hosting.getMemoizeDuration())) {
      airbnb.availability(hosting.getId(), options, function success(hostingAvailability) {
        // Update availability for this hosting
        hosting.availability = hostingAvailability;

        // Update timestamp
        hosting.availabilityLastUpdated = new Date().getTime();

        // Invoke success callback
        if (_.isFunction(successCallback)) {
          successCallback(hosting.availability);
        }
      }, function failure(err, res) {
        // Invoke failure callback if provided
        if (_.isFunction(failureCallback)) {
          failureCallback(err, res);
        }
      });
    }
    // Otherwise return from cache
    else {
      if (_.isFunction(successCallback)) {
        successCallback(hosting.availability);
      }
    }
  };

  Hosting.prototype.getReviews = function(options, successCallback, failureCallback) {
    var hosting = this,
      now = new Date().getTime();

    function _getReviews() {
      if (!hosting.reviews ||
          (now > hosting.reviewsLastUpdated + hosting.getMemoizeDuration())) {
        airbnb.reviews(hosting.info.listing.user_id, options, function success(hostingReviews) {
          // Update reviews for this hosting
          hosting.reviews = hostingReviews;

          // Update timestamp
          hosting.reviewsLastUpdated = new Date().getTime();

          // Invoke success callback
          if (_.isFunction(successCallback)) {
            successCallback(hosting.reviews);
          }
        }, function failure(err, res) {
          // Invoke failure callback if provided
          if (_.isFunction(failureCallback)) {
            failureCallback(err, res);
          }
        });
      }
      // Otherwise return from cache
      else {
        if (_.isFunction(successCallback)) {
          successCallback(hosting.reviews);
        }
      }
    }


    // Make sure this hosting has user ID, otherwise try to grab the info first
    if (!hosting.info || !hosting.info.listing.user_id) {
      hosting.getInfo(function(hostingInfo) {
        _getReviews();
      }, function(err, res) {
        if (_.isFunction(failureCallback)) {
          failureCallback(err, res);
          return;
        }
        else {
          throw new Error('Hosting does not have a user associated with it');
        }
      });
    }

    // Only make a new call if we haven't OR the memoization has expired   
    else {
      _getReviews();
    }
  };

  return Hosting;
})();


module.exports = Hosting;
