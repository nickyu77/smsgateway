var express = require('express');
var router = express.Router();
var querystring = require('querystring');
const axios = require('axios').create({});



var accountSid;
var authToken;

var twilio = require('twilio');
//var client = new twilio(accountSid, authToken);
//var client;

//Get message from Desktop

axios.defaults.baseURL = 'https://dpt.theismailiusa.org/api/v2/tickets/2269/messages';

axios.defaults.headers['authorization'] = 'key 1:N7MJ53GA2TNSYS4GHDPZ88YAS';
axios.defaults.headers['Content-Type'] = 'application/json';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json(`Twilio Message API Gateway`);
});

router.post('/message', function(req, res, next) {
  let message = req.body.message || 'test message';
  let fromMobile = req.body.from || '+18329812858';
  let toMobile = req.body.to || '+18052083159';
  accountSid = req.body.account_sid;
  authToken = req.body.auth_token;
  //client = new twilio(accountSid, authToken);
  
  console.log('fromMobile:',fromMobile);
  console.log('toMobile:',toMobile);
  console.log('message:',message);
  
  axios.get('https://dpt.theismailiusa.org/api/v2/tickets/2269/messages')
  .then(function(response){
    console.log(response.data); // ex.: { user: 'Your User'}
    console.log(response.status); // ex.: 200
  }).catch(e => {
    console.log(e)
    next();
  });
  
  axios.defaults.baseURL = 'https://api.twilio.com/2010-04-01/Accounts/' + accountSid + '/';
	axios.defaults.headers['authorization'] = 'Basic '+ authToken;
	axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  

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
