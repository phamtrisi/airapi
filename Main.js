var request = require('request');
var Airbnb = require('./Airbnb');

Airbnb.search({
    location: 'Seattle, WA',
    checkin: '07/03/2015',
    checkout: '07/06/2015',
    guests: 2,
    page: 2,
    ib: true
}, function(err, res, listings) {
  console.log(listings);
});


Airbnb.availability(4569115, {}, function(err, res, info) {
  console.log(info);
});
