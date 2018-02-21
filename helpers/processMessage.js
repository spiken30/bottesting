const FACEBOOK_ACCESS_TOKEN = process.env.FBTOKEN || '';
const CAT_IMAGE_URL = 'http://botcube.co/public/blog/apiai-tutorial-bot/hosico_cat.jpg';

const request = require('request');

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
