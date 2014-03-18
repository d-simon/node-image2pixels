var gd = require('node-gd')
  , mopen = require('gd-magicopen')
  , i2p = require('gd-image2pixels');

module.exports = function (filename, callback) {
    mopen(filename, function (err, inputimg){
        if(err) callback(err, null);
        pixels = i2p(inputimg);
        callback(null, pixels);
    });
};