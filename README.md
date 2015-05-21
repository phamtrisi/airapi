#AirAPI
AirAPI is a Node wrapper for AirBnb *unofficial* API.
AirBnb does not provide a public API, so this might/might not violate their policies.
Use at your own risk. I'm not responsible for any misuse of this.

##Usage
- Search instant-bookable hostings in Seattle, July 3-6, for 2 guests
```javascript
var Airbnb = require('Airbnb');

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
```
- Get availability in May and Jun for hosting with ID: 4569115
```javascript
Airbnb.availability(4569115, {
 currency: 'USD',
 month: 7,
 year: 2015,
 count: 2
}, function(err, res, info) {
  console.log(info);
});
```
- To run the example
```javascript
git clone airapi
cd airapi && node Main.js
```

##Search listings
Airbnb.search(options, successCallback, failureCallback)
- **successCallback**(error, response, hostings)
- **failureCallback**(error, response)

##Get hosting info
  *Coming soon*

##Get availabily for a hosting
Airbnb.availability(hosting ID, options, successCallback, failureCallback)
- **successCallback**(error, response, info)
- **failureCallback**(error, response)

##License
What license? I'd be happy if it doesn't get struck down.
Use at your own risk. You've been warned.
