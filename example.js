var airbnb = require('./lib');

// Search
airbnb.search({
    location: 'Seattle, WA',
    checkin: '07/03/2015',
    checkout: '07/06/2015',
    guests: 2,
    page: 2,
    ib: true
}, function(err, res, listings) {
  console.log(listings);
});

// Est income
airbnb.income(4944661, {
  month: 1,
  year: 2015,
  count: 12
}, function(income) {
  console.log(income);
});

// Hosting info
airbnb.info('4882295', function(err, res, info) {
  console.log(info);
});

// User reviews
airbnb.reviews(266101, {
  role: 'host'
}, function(err, res, reviews) {
  console.log(reviews);
});