'use strict';

var BMP280 = require('node-bmp280');

var barometer = new BMP280();

barometer.begin(function(err) {
    if (err) {
        console.info('error initializing barometer', err);
        return;
    }

    console.info('barometer running');
console.log('BARA', Object.keys(barometer));

    setInterval(function() {
        barometer.readPressureAndTemparature(function(err, pressure, temperature) {
          // HectoPascal to Inches of Mercury
          let ourPressure = (pressure * 0.029529980164712).toFixed(2);

          //  Celcius to Farhenheight;
          let ourTemp = (temperature * 1.8 + 32).toFixed(2);
            console.info('barometer: ', ourPressure, ourTemp);
        });
    }, 1000);
});
