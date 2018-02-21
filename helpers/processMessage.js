const FACEBOOK_ACCESS_TOKEN = process.env.FBTOKEN || '';
const CAT_IMAGE_URL = 'http://botcube.co/public/blog/apiai-tutorial-bot/hosico_cat.jpg';

const request = require('request');

module.exports = (event) => {
    console.log(event);
    const senderId = event.sender.id;
    const message = event.message.text;
    var msg = "no entiendo lo que dices amigo";

    if (messsage.includes("Hola") || messsage.includes("hola"))
      msg = "Hola como te va amigo? que puedo hacer por ti";

    if (messsage.includes("adios") || messsage.includes("Adios"))
      msg = "Adios perro !";



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
};
