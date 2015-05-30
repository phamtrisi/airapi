// var airbnb = require('./airbnb');

// // Search for available listings in NYC, July 4th - 6th, 2 people
// // Then print out their info
// airbnb.search({
//   location: 'New York, NY',
//   checkin: '07/04/2015',
//   checkout: '07/06/2015',
//   guests: 2,
//   page: 1
// }, function(hostings, search) {
//   if (hostings.length) {
//     hostings.forEach(function(hosting) {
//       console.log(hosting);
//     });
//   }
// }, function(err, res) {
//   console.log('Error: ', err);
// });
// 
// 
var search = require('./api/search'),
    info = require('./api/info'),
    availability = require('./api/availability'),
    reviews = require('./api/reviews'),
    income = require('./api/income');

// reviews(266101, {
//   role: 'host'
// }, function(reviews) {
//   console.log(reviews);
// })

availability(4944661, {
  month: 7,
  count: 3,
  year: 2015
}, function(info) {
  console.log(income(info));
});

// search({
//   location: 'New York, NY',
//   checkin: '07/04/2015',
//   checkout: '07/06/2015',
//   guests: 2,
//   page: 1
// }, function(hostings) {
//   console.log(hostings);
// }, function(err, res) {
//   console.log('Error: ', err);
// });

