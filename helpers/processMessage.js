const FACEBOOK_ACCESS_TOKEN = process.env.FBTOKEN || '';
const CAT_IMAGE_URL = 'http://botcube.co/public/blog/apiai-tutorial-bot/hosico_cat.jpg';

const request = require('request');

function sendMessage(senderId,message)
{
    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: { access_token: FACEBOOK_ACCESS_TOKEN },
      method: 'POST',
      json: {
        recipient: { id: senderId },
        message: message
        //message: {
        //    attachment: {
        //        type: 'image',
        //        payload: { url: CAT_IMAGE_URL}
        //    }
        //}
      }
    });
}

module.exports = (event) => {
  console.log(event);
  const senderId = event.sender.id;
  const message = event.message.text.toUpperCase();
  var msg = "no entiendo lo que dices amigo";

  if (message.includes("HOLA"))
  msg = "Hola como te va amigo? que puedo hacer por ti";

  if (message.includes("ADIOS"))
  msg = "Adios amigo !";

  request({
    url: "https://graph.facebook.com/v2.6/" + senderId,
    qs: {
      access_token: FACEBOOK_ACCESS_TOKEN,
      fields: "first_name"
    },
    method: "GET"
  }, function(error, response, body) {
      var greeting = "";
      if (error) {
        console.log("Error getting user's name: " +  error);
      } else {
        var bodyObj = JSON.parse(body);
        name = bodyObj.first_name;
        greeting = "Hi " + name + ". ";
      }
      var message = greeting + "My name is SP Movie Bot. I can tell you various details regarding movies. What movie would you like to know about?";
      sendMessage(senderId, {text: message});
  });
};
