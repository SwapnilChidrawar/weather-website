const request = require('request');

const foreCast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/17e203a6376848bedeb4893ca78558a3/' + latitude + ',' + longitude;
    request({url, json: true}, (error, {body} ) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find locations', undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + 'It is currently ' + body.currently.temperature + ' degrees out.There is a ' + body.currently.precipProbability + '% chance of rain.');
        }
    });
};

module.exports = foreCast;