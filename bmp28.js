'use strict';

var BMP280 = require('node-bmp280');

var barometer = new BMP280();

barometer.begin(function(err) {
    if (err) {
        console.info('error initializing barometer', err);
        return;
    }

    console.info('barometer running');

    setInterval(function() {
        barometer.readPressureAndTemparature(function(err, pressure, temperature) {

          // HectoPascal to Inches of Mercury
          let ourPressure = pressure * 0.029529980164712;

          //  Celcius to Farhenheight;
          let ourTemp = temperature * 1.8 + 32).toFixed(2);
            console.info('barometer: ', ourPressure, ourtemperature);
        });
    }, 1000);
});
