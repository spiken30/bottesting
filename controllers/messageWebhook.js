//const processMessage = require('../helpers/processMessage');

module.exports = (req, res) => {
  console.log(req);
  if (req.body.object === 'page') {
    req.body.entry.forEach(entry => {
      entry.messaging.forEach(event => {
        if (event.message && event.message.text) {
          console.log(event.message.text);
        }
      });
    });

    res.status(200).end();
  }
};
