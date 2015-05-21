var request = require('request'),
    _ = require('lodash'),
    Airbnb = (function Airbnb() {
        var today = new Date(),
            tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000),
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
            SEARCH_URL = AIRBNB_PREFIX + '/search/search_results';

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
                } else if (typeof value === 'object' && Array.isArray(value)) {
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
            request(requestConfigs, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    successCallback(error, response, body);
                } else if (error && typeof failureCallback === 'function') {
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
