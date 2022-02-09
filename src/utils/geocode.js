const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiZGFuaXNobW9iaW4iLCJhIjoiY2t6YmEyaDNuMjhxbzJycDQwbnFiYmhlNCJ9.5usZyKSWIPz4ccWHgwb2dA&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to mapbox service!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search!", undefined);
    } else {
      const features = body.features[0];
      const latitude = features.center[1];
      const longitude = features.center[0];

      callback(undefined, {
        latitude,
        longitude,
        location: features.place_name,
      });
    }
  });
};

module.exports = {
  geocode,
};
