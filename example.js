var airbnb = require('./airbnb');

// Search for available listings in NYC, July 4th - 6th, 2 people
// Then print out their info
airbnb.search({
  location: 'New York, NY',
  checkin: '07/04/2015',
  checkout: '07/06/2015',
  guests: 2,
  page: 1
}, function(hostings, resp) {
  hostings.forEach(function(hosting) {
    // Get info
    hosting.getInfo(function(info) {
      console.log(info);
    });    
  });
}, function(err, res) {
  console.log('Error: ', err);
});

// User the Hosting model to create a hosting object (ID: 56200)
var hosting1 = new airbnb.Hosting(56200);

// Get availability from June to Nov 2015 for this hosting
hosting1.getAvailability({
  month: 6,
  year: 2015,
  count: 6
}, function(availability) {
  console.log(availability);
});

// Get reviews for this hosting
hosting1.getReviews({
  role: 'host'
}, function(reviews) {
  console.log(reviews);
});

