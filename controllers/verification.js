module.exports = (req, res) => {
  try {
    const hubChallenge = req.query['hub.challenge'];

   const hubMode = req.query['hub.mode'];
    const verifyTokenMatches = (req.query['hub.verify_token'] === 'Bottesting');

   if (hubMode && verifyTokenMatches) {
    res.status(200).send(hubChallenge);
    } else {
    res.status(403).end();
    }
  } catch(Exception ex)
  {
    console.log(ex);
  }
};
