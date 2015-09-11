AirAPI
==============

AirAPI is a convenient NodeJS wrapper for Airbnb's API endpoints.
This is not affiliated nor endorsed by Airbnb.
Airbnb does not provide public access to their API, so use at your own risk. 
I'm not responsible for any misuse of this.

##How to

```javascript
// Include the library in your app
var airbnb = require('airapi');

// Search
airbnb.search(options);

// Get calendar
airbnb.getCalendar(options);

// Get hosting information
airbnb.getInfo(hostingId);

// Get hosting estimate income, given availability, 
// which can be retrieved using `airbnb.getCalendar()` above
airbnb.getEstIncome(hostingAvailability);

// Get hosting reviews
airbnb.getReviews(userId, options);
```

**NOTE: All of these API endpoints, except for `getEstIncome` return a promise.**

##Examples
###Search

Search instant-bookable hostings in Seattle, Wa from July 3rd - July 6th, 2015, for 2 people, 2nd result page.
```javascript
airbnb.search({
 location: 'Seattle, WA',
 checkin: '07/03/2015',
 checkout: '07/06/2015',
 guests: 2,
 page: 2,
 ib: true
}).then(function(searchResults) {
  console.log(searchResults);
});
```

Possible search options 
```
{
  checkin: {String}, e.g: '04/30/2015'
  checkout: {String},
  guests: {Number},
  page: {Number},
  location: {String}, e.g: 'New York, NY' or 'Seattle, WA'
  price_min: {Number},
  price_max: {Number},
  min_bedrooms: {Number},
  min_bathrooms: {Number},
  min_beds: {Number},
  superhost: {Boolean},
  hosting_amenities: {Array of id}, e.g: [1,4]
  property_type_id: {Array of id}, e.g: [1]
  languages: {Array of id}, e.g: [1,64]
  keywords: {String}, e.g: 'ocean,view,balcony'
  room_types: {Array}, e.g: ['Entire home/apt', 'Private room', 'Shared room']
  ib: {Boolean}, instant-book
  neighborhoods: {Array}, e.g: ['Belltown', 'Queen Anne']
}
```
###Hosting calendar

Get May + June 2015 calendar for hosting ID: 4569115
```javascript
airbnb.getCalendar(4569115, {
 currency: 'USD',
 month: 5,
 year: 2015,
 count: 2
}).then(function(schedules) {
  console.log(schedules);
});
```

###Hosting information

Get general information for hosting ID: 4569115
```javascript
airbnb.getInfo(4569115).then(function(info) {
  console.log(info);
});
```

###Hosting estimate income

Estimate income for hosting ID: 4569115 for Jan + Feb, 2015
```javascript
airbnb.getCalendar(4569115, {
 currency: 'USD',
 month: 1,
 year: 2015,
 count: 2
}).then(function(schedules) {
  console.log(airbnb.getEstIncome(schedules));
});
```

###Hosting reviews

Get reviews for user ID: 4586440, as a host
```javascript
airbnb.getReviews(4586440, {
  page: 1,
  role: 'host'
}).then(function(reviews) {
  console.log(reviews);
});
```

Get reviews for user ID: 4586440, as a guest
```javascript
airbnb.getReviews(4586440, {
  page: 1,
  role: 'guest'
}).then(function(reviews) {
  console.log(reviews);
});
```

- To run the example
```javascript
git clone https://github.com/phamtrisi/airapi.git airapi
cd airapi && npm install && node example.js
```

##License
Free to use. Please star if this is helpful to you.
