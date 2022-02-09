const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=5d7115c5f318b929fe96ced49dc5d1ec&query=${latitude},${longitude}&units=f`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weatherstack service!", undefined);
    } else if (body.error) {
      callback("Unable to find location from weatherstack service!", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. There is a ${body.current.precip}% chance of rain.`
      );
    }
  });
};

module.exports = {
  forecast,
};
