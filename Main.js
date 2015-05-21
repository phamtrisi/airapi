var request = require('request');
var Airbnb = require('./Airbnb');

Airbnb.search({
    location: 'Seattle, WA',
    checkin: '07/03/2015',
    checkout: '07/06/2015',
    guests: 2,
    page: 2,
    ib: true
}, function(err, res, body) {
    var result = JSON.parse(body);
    console.log(result.logging_info.search.result)
});
