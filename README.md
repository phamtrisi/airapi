#AirAPI
AirAPI is a Node wrapper for AirBnb *unofficial* API.
AirBnb does not provide a public API, so this might/might not violate their policies.
Use at your own risk. I'm not responsible for any misuse of this.

##Usage

###Using the API methods separately
- Search instant-bookable hostings in Seattle, July 3-6, for 2 guests
```javascript
var airbnb = require('airbnb');

airbnb.search({
 location: 'Seattle, WA',
 checkin: '07/03/2015',
 checkout: '07/06/2015',
 guests: 2,
 page: 2,
 ib: true
}, function(hostings, response) {
 console.log(hostings);
});
```

- Get availability in May and Jun for hosting with ID: 4569115
```javascript
airbnb.availability(4569115, {
 currency: 'USD',
 month: 5,
 year: 2015,
 count: 2
}, function(availability) {
  console.log(availability);
});
```

- Get info about hosting ID 4569115
```javascript
airbnb.info(4569115, function(info) {
  console.log(info);
});
```

- Get estimate income for hosting ID 4569115, for Jan and Feb, 2015
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

- Get user reviews for user ID 4586440, as a host
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
cd airapi && node Main.js
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
