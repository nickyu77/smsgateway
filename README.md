## Twilio Message Gateway

For running the local API

```
curl -s -X POST \
  http://localhost:3000/message \
  -H "content-type: application/json" \
  -d '{
    "from":"+18329812858",
    "to":"+18052083159",
    "message":"hello nick"
}'
```

For remote
```
curl -s -X POST \
  https://gentle-citadel-54100.herokuapp.com/message \
  -H "content-type: application/json" \
  -d '{
    "from":"+18329812858",
    "to":"+18052083159",
    "message":"hello nick"
}'
```

For Postman
import file: `twilio sms.postman_collection.json` to Postman
