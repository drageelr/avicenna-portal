const axios = require('axios').default;
const queryString = require('query-string');
const customError = require('../errors/errors');

exports.sendMessage = async (phone, skey, message) => {
    try {
        let query = queryString.stringify({phone: phone, text: message, apikey: skey}, {sort: false})

        let res = await axios.get('https://api.callmebot.com/whatsapp.php?' + query);

        let data = res.data
        if (typeof data != 'string') {
            data = toString(data);
        }
        if (!data.includes("Message queued")) throw new customError.NotFoundError("unable to send message");
        return true;
    } catch(e) {
        return false;
    }
}