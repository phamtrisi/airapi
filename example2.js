var airbnb = require('./airbnb');

// Search for available listings in NYC, July 4th - 6th, 2 people
// Then print out their info
airbnb.search({
  location: 'New York, NY',
  checkin: '07/04/2015',
  checkout: '07/06/2015',
  guests: 2,
  page: 1
}, function(hostings, search) {
  if (hostings.length) {
    hostings.forEach(function(hosting) {
      console.log(hosting);
    });
  }
}, function(err, res) {
  console.log('Error: ', err);
});
