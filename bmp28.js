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
          let ourPressure = pressure * 0.029529980164712;
            console.info('barometer: ', ourPressure, temperature);
        });
    }, 1000);
});
