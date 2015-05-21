var request = require('request'),
		_ = require('lodash'),
		Airbnb = (function Airbnb() {
			var today = new Date(),
					tomorrow = new Date(today.getTime() + 24*60*60*1000),
					SEARCH_DEFAULT = {
						guests: 1,
						checkin: [today.getMonth() + 1, today.getDate(), today.getFullYear()].join('/'), // today
						checkout: [tomorrow.getMonth() + 1, tomorrow.getDate(), tomorrow.getFullYear()].join('/'), // tomorrow
					},
					CONFIGS_DEFAULT = {
						headers: {
							'User-Agent': 'request'
						}
					},
					AIRBNB_PREFIX = 'https://www.airbnb.com',
					SEARCH_URL = AIRBNB_PREFIX + '/search/search_results',
					test_url = 'https://www.airbnb.com/search/search_results?location=London%2C+United+Kingdom&checkin=05%2F29%2F2015&checkout=05%2F31%2F2015&guests=2';

			/**
			 * HELPERS
			 */
			
			/**
			 * Serialize an object into a valid URL string
			 * @param  {[Object]} obj - Params object
			 * @return {[String]} - A valid encoded URL string
			 */
			function _serialize(obj) {
				var params = [],
		        encodedBrackets = encodeURIComponent('[]');
				
				_.forOwn(obj, function(value, key) {
					if (typeof value === 'string' ||
							typeof value === 'number' ||
							typeof value === 'boolean') {
						params.push(key + '=' + encodeURIComponent(value));
					}	
					else if (typeof value === 'object' && Array.isArray(value)) {
	          params.push(value.map(function(param) {
	            return key + encodedBrackets + '=' + encodeURIComponent(param);
	          }).join('&'));  
					}
				});

				return params.join('&');
			}


			/**
			 * Search listings
			 * @param  {Object} options - Search options
			 * @return {Object} - List of found listings       
			 */
			function search(options, successCallback, failureCallback) {
				// Make sure search options is provided
				if (!options || typeof options !== 'object') {
					throw new Error('Must provide search options');
				}

				// Make sure at least dates of travel and location are provided
				if (!options.hasOwnProperty('location')) {
					throw new Error('Must provide location');
				}

				var searchOptions = _.assign({}, SEARCH_DEFAULT, options),
						requestConfigs = _.assign({}, CONFIGS_DEFAULT, {
							url: SEARCH_URL + '?' + _serialize(searchOptions)
						});

				// Make request
				request(requestConfigs, function (error, response, body) {
				  if (!error && response.statusCode == 200) {
				    successCallback(error, response, body);
				  }
				  else if (error && typeof failureCallback === 'function') {
				  	failureCallback(error, response, body);
				  }
				});
			}

			function info(listings, options) {
				return {
					status: 'ok'
				};
			}

			function availability(listings, options) {
				return {
					status: 'ok'
				};
			}


			return {
				search: search,
				info: info,
				availability: availability
			};
		})();

module.exports = Airbnb;