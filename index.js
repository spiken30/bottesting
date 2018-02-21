const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT || 3000, () => console.log('Webhook server is listening, port 3000'));
//const verificationController = require('./controllers/verification');
const messageWebhookController = require('./controllers/messageWebhook');

app.get('/', function (req,res) {
  const hubChallenge = req.query['hub.challenge'];

 const hubMode = req.query['hub.mode'];
  const verifyTokenMatches = (req.query['hub.verify_token'] === 'Bottesting');

 if (hubMode && verifyTokenMatches) {
  res.status(200).send(hubChallenge);
  } else {
  res.status(403).end();
  }
});
app.post('/', messageWebhookController);
