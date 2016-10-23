'use strict';
const BMP280 = require('node-bmp280');
const barometer = new BMP280();

//  'indoor' temp - barometer...
barometer.begin((err) => {
    if (err) {
        console.info('error initializing barometer', err);
        return err;
    }

    setInterval(() => {
        barometer.readPressureAndTemparature((err, pres, temp) => {
          // HectoPascal to Inches of Mercury
          let ourPressure = (pres * 0.029529980164712).toFixed(2);

          //  Celcius to Farhenheight;
          let ourTemp = (temp * 1.8 + 32).toFixed(2);
          return {
            '0': {
              'pressure': pres,
              'temparature': temp,
            },
            '1': {
              'pressure': ourPressure,
              'temparature': ourTemp,
            },
          }
          console.info('barometer: ', ourPressure, ourTemp);
        });
    }, 1000);
});
