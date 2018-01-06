var express = require('express');
var router = express.Router();
var querystring = require('querystring');
const axios = require('axios').create({});

let token = 'QUM2MmYxOTdkMmQ3MzFjNDM2YzYyMjcwYzk5OWJmZGM5ZjplYmVjZmFjNzU1NWQzNDhiMWY0Mjk4OTA1MTgzMjljNw==';

axios.defaults.baseURL = 'https://api.twilio.com/2010-04-01/Accounts/AC62f197d2d731c436c62270c999bfdc9f/';
// axios.defaults.headers.common['Authorization'] = 'Basic '+ token;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers['authorization'] = 'Basic '+ token;
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

var accountSid = 'AC62f197d2d731c436c62270c999bfdc9f'; // Your Account SID from www.twilio.com/console
var authToken = 'QUM2MmYxOTdkMmQ3MzFjNDM2YzYyMjcwYzk5OWJmZGM5ZjplYmVjZmFjNzU1NWQzNDhiMWY0Mjk4OTA1MTgzMjljNw==';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json(`Twilio Message API Gateway`);
});

router.post('/message', function(req, res, next) {
  let message = req.body.message || 'test message';
  let fromMobile = req.body.from || '+18329812858';
  let toMobile = req.body.to || '+18052083159';
  console.log('fromMobile:',fromMobile);
  console.log('toMobile:',toMobile);
  console.log('message:',message);

  axios.post('Messages.json',
    querystring.stringify({From: fromMobile, To: toMobile, Body: message }))
  .then(result => {
    res.json( result.data);
  }).catch(e => {
    console.log(e)
    next();
  })
});
module.exports = router;
