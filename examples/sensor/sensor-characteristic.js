var util = require('util');
var bleno = require('../..');
var sensor = require('/home/pi/Downloads/node_modules/node-dht-sensor/build/Release/node_dht_sensor');



var SensorCharacteristic = function() {
  SensorCharacteristic.super_.call(this, {
    uuid: '12345678901234567890123456789012',
    properties: ['notify']
  });
};

util.inherits(SensorCharacteristic, bleno.Characteristic);

SensorCharacteristic.prototype.onSubscribe = function(maxValueSize, updateValueCallback) {
  console.log('sensor data read');

/*  this.counter = 0;
  this.changeInterval = setInterval(function() {
    var data = new Buffer(4);
    data.writeUInt32LE(this.counter, 0);

    console.log('NotifyOnlyCharacteristic update value: ' + this.counter);
    updateValueCallback(data);
    this.counter++;

  }.bind(this), 2000);
*/
  this.changeInterval = setInterval(function() {
    var data = new Buffer(12);
    sensor.read(11, 18, function(err, temperature, humidity) {
        if (!err) {
            console.log('temp: ' + temperature.toFixed(1) + '°C, ' +  'humidity: ' + humidity.toFixed(1) + '%' );
            data.write('            ');
            data.write(temperature.toFixed(1) + ' , ' + humidity.toFixed(1));
        //    data.write(temperature.toFixed(1) + );
//            data.write(':');
//            data.write(humidity.toFixed(1));
            updateValueCallback(data);
        }
        else {
            console.log('Sensor Read Error, exit ...');
        }
    });

  }.bind(this), 2000);
};

SensorCharacteristic.prototype.onUnsubscribe = function() {
  console.log('SensorCharacteristic unsubscribe');

  if (this.changeInterval) {
    clearInterval(this.changeInterval);
    this.changeInterval = null;
  }
};

SensorCharacteristic.prototype.onNotify = function() {
  console.log('NotifyOnlyCharacteristic on notify');
};

module.exports = SensorCharacteristic;
