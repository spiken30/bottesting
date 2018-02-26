const FACEBOOK_ACCESS_TOKEN = process.env.FBTOKEN || '';
const CAT_IMAGE_URL = 'http://botcube.co/public/blog/apiai-tutorial-bot/hosico_cat.jpg';

const request = require('request');

function sendMessage(senderId,name,message)
{
  message = message.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  var msg = "no entiendo lo que dices amigo";

  if (message.includes("HOLA"))
    msg = "Hola " + name + " como te va? que puedo hacer por ti.";

  if (message.includes("SERVICIOS"))
    msg = name + " nuestros servicios incluyen: Marketing, Social Media, entre otros";

  if (message.includes("CONTACTO"))
    msg = name + " por favor llamanos al 01 800 123 123 123 o escribenos a himkt@himkt.com";

  if (message.includes("GUAPO"))
    msg = "tu tambien " + name;

  if (message.includes("ADIOS"))
    msg = "Adios " + name + " !";

    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: { access_token: FACEBOOK_ACCESS_TOKEN },
      method: 'POST',
      json: {
        recipient: { id: senderId },
        message: {
          text: msg
        }
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
  const senderId = event.sender.id;
  const message = event.message.text.toUpperCase();
  var name = "";
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
      }
      sendMessage(senderId, name, message);
  });
};
