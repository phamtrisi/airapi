var airbnb = require('../airbnb'),
  client = new airbnb({
    username: 'phamtrisi@gmail.com',
    password: '<your password here>'
  });

client.login().then(function(res) {
  console.log('loggedin', client);
});

// Search for available listings in NYC
client.search({
  location: 'New York, NY',
  checkin: '07/04/2015',
  checkout: '07/06/2015',
  guests: 2,
  page: 1
}).then(function(results) {
  console.log(results);
});

// Get info for hosting ID: 4639847
client.getInfo(4639847).then(function(info) {
  console.log(info);
});

// Get calendar from June to Nov 2015 for hosting ID: 4639847
client.getCalendar(4639847, {
  month: 6,
  year: 2015,
  count: 6
}).then(function(schedules) {
  console.log(schedules);
});

// Get reviews for user ID: 4586440
client.getReviews(4586440, {
  role: 'host'
}).then(function(reviews) {
  console.log(reviews);
});

// Estimate income for hosting ID: 4569115 for Jan + Feb, 2015
client.getCalendar(4569115, {
 currency: 'USD',
 month: 1,
 year: 2015,
 count: 2
}).then(function(schedules) {
  console.log(client.getEstIncome(schedules));
});
