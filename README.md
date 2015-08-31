AirAPI
==============

AirAPI is a convenient NodeJS wrapper for Airbnb's API endpoints.
This is not affiliated nor endorsed by Airbnb.
Airbnb does not provide public access to their API, so use at your own risk. 
I'm not responsible for any misuse of this.

##How to

Include the library in your app
```javascript
var airbnb = require('airbnb');

// Search
airbnb.search(configs, callback);

// Get calendar
airbnb.availability(configs, callback);

// Get hosting information
airbnb.info(hostingId, callback);

// Get hosting estimate income
airbnb.income(hostingAvailability);

// Get hosting reviews
airbnb.review(hostingId, configs, callback);
```

###Search
```javascript
airbnb.search({
 location: 'Seattle, WA',
 checkin: '07/03/2015',
 checkout: '07/06/2015',
 guests: 2,
 page: 2,
 ib: true
}, function(hostings, response) {
  // hosting - the list of hostings objects returned. See documentation for Hosting object below.
  // response - the original HTTP request response
});
```
###Hosting availability
```javascript
airbnb.availability(4569115, {
 currency: 'USD',
 month: 5,
 year: 2015,
 count: 2
}, function(availability) {
  // availability - hosting's calendar for given months
});
```

###Hosting information
```javascript
airbnb.info(4569115, function(info) {
  console.log(info);
});
```

###Hosting estimate income
```javascript
airbnb.availability(4569115, {
 currency: 'USD',
 month: 1,
 year: 2015,
 count: 2
}, function(availability) {
  console.log(airbnb.income(availability));
});
```

###Hosting reviews
```javascript
airbnb.reviews(4586440, {
  page: 1,
  role: 'host'
}, function(err, res, reviews) {
  console.log(reviews);
});
```

- Get user reviews for user ID 4586440, as a guest
```javascript
airbnb.reviews(4586440, {
  page: 1,
  role: 'guest'
}, function(reviews) {
  console.log(reviews);
});
```

- To run the example
```javascript
git clone https://github.com/phamtrisi/airapi.git airapi
cd airapi && npm install && node example.js
```

###Using the Hosting object model
*search* will return a list of Hosting, with methods to get info, availability and reviews, so you don't have to use the API methods directly. You can do

```js
var hosting = new airbnb.Hosting(56200); // 56200 is hosting ID

hosting.getInfo(function(info) {
 console.log(info);
});

hosting.getAvailability({
 month: 6,
 year: 2015,
 count: 6
}, function(info) {
 console.log(info);
});

hosting.getReviews({
 role: 'host'
}, function(reviews) {
 console.log(reviews);
});
```

##Search listings
airbnb.search(options, successCallback, failureCallback)
- **successCallback**(hostings, responseJSON)
- **failureCallback**(error, response)

##Get hosting info
airbnb.info(hostingId, successCallback, failureCallback)
- **successCallback**(info)
- **failureCallback**(error, response)

##Get availabily for a hosting
airbnb.availability(hostingId, options, successCallback, failureCallback)
- **successCallback**(availabilityInfo)
- **failureCallback**(error, response)

##Get estimate income by month, for a hosting
airbnb.income(availability)

##Get reviews for a user
airbnb.reviews(userID, options, successCallback, failureCallback)
- **successCallback**(reviews[])
- **failureCallback**(error, response)

##License
What license? I'd be happy if it doesn't get struck down.
Use at your own risk. You've been warned.
