var request = require('request');
var Airbnb = require('./Airbnb');

Airbnb.search({
    location: 'New York, NY',
    checkin: '06/03/2015',
    checkout: '06/06/2015'
}, function(err, res, body) {
    console.log(body);
});
