const express = require('express');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
const app = express();

var url = process.env.MONGODB_URI //mLab Mongo
var db;

MongoClient.connect(url, function (err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    db = database.db(process.env.MONGODB);
    console.log('Database Connected');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT || 3000, () => console.log('Webhook server is listening, port 3000'));
//const verificationController = require('./controllers/verification');
const messageWebhookController = require('./controllers/messageWebhook');

app.get('/', function (req,res) {
  const hubChallenge = req.query['hub.challenge'];
  const hubMode = req.query['hub.mode'];
  const verifyTokenMatches = (req.query['hub.verify_token'] === (process.env.VERIFY_TOKEN || 'Bottesting'));

 if (hubMode && verifyTokenMatches) {
  res.status(200).send(hubChallenge);
  } else {
  res.status(200).send('challenge not set!');
  }
});

app.get('/ai', function (req,res) {
  db.collection("ai").find({}).toArray(function (err, docs) {
       if (err) {
           handleError(res, err.message, 'Error al obtener accounts');
       } else {
            var results = [];
            for (var i = 0; i < docs.length; i++)
            {
                results.push(docs[i]);
            }
           res.status(200).json(results);
       }
    });
});


app.post('/ai', function (req,res) {
  db.collection("ai").save(req.body, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    res.status(200).json({result:100,message:'Inserted!'});
  });
});

app.post('/', messageWebhookController);
