var util = require('util');
var bleno = require('../..');
var SensorService = require('./sensor-service');

var sensorService = new SensorService();
var name = 'TempHumiSensor'; //set the name of the device

//start to advertise when hardware is ready
bleno.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    
    bleno.startAdvertising(name, [sensorService.uuid], function(err) {
      if (err) {
        console.log(err);
      }
    });
  }
  else {
    bleno.stopAdvertising();
  }
});

//set service, refer to sensor-service.js
bleno.on('advertisingStart', function(err) {
  if (!err) {
    console.log('advertising...');
    //
    bleno.setServices([
      sensorService
    ]);
  }
});
