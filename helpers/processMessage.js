const FACEBOOK_ACCESS_TOKEN = process.env.FBTOKEN || '';
const CAT_IMAGE_URL = 'http://botcube.co/public/blog/apiai-tutorial-bot/hosico_cat.jpg';

const request = require('request');

module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;

    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: { id: senderId },
            message: {
                attachment: {
                    type: 'image',
                    payload: { url: CAT_IMAGE_URL}
                }
            }
        }
    });
};
