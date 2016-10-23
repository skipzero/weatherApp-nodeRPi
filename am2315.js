// init prerequisites
const Driver = require('i2c-sensor-am2315');

// create device
const  device = new Driver;

// read the sensor
device.read(function(err, data) {
	if (err) {
		console.error(err);
	} 
console.log(Object.keys(device));
	console.log('Original in K');
	console.log(data+'\n');
	console.log('Convert K to °F');
	console.log(device.convertKelvinToFahrenheit(data)+'\n');
	console.log('Convert K to °C');
//	console.log(device.convertKelvinToCelcius(data)+'\n');
});
