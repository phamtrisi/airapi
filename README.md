#AirAPI
AirAPI is a Node wrapper for AirBnb *unofficial* API.
AirBnb does not provide a public API, so this might/might not violate their policies.
Use at your own risk. I'm not responsible for any misuse of this.

##Search listings
Airbnb.search(options, successCallback, failureCallback)
  successCallback(error, response, body)
    You might wanna do JSON.parse(body) for valid JSON object
  
  failureCallback(error, response, body)

##Get listing(s) info
  Airbnb.info([listings IDs], options).then()

##Get availabily for listing(s)
  Airbnb.availability([listings IDs], options);

##License
What license? This is probably gonna be struck down by Airbnb soon :"(
Use at your own risk. You've been warned.
