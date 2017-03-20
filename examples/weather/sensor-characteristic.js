var util = require('util');
var bleno = require('../..');
var sensor = require('node-dht-sensor');
var receive;


sensor.initialize(11, 4); 
//set the UUID and properties of characteristics
var SensorCharacteristic = function() {
  SensorCharacteristic.super_.call(this, {
    uuid: '12345678901234567890123456789012',
    properties: ['write','read']
  });
};

util.inherits(SensorCharacteristic, bleno.Characteristic);


SensorCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG);
  }
  else if (data.length !== 1) {
    callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
  }
  else {
    
    receive = data.toString();
    callback(this.RESULT_SUCCESS);
  }
};

SensorCharacteristic.prototype.onReadRequest = function(offset, callback) {
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG, null);
  }
  else {
    if(receive == '1'){
       console.log("on");

       var readout = sensor.read(); 
       var tempStr = readout.temperature.toFixed(2);
       var HumiStr = readout.humidity.toFixed(2);
       
       var data = new Buffer(12);
       data.write(tempStr + " , " + HumiStr);
       callback(this.RESULT_SUCCESS, data);
    }else{
       console.log("off");
       var data = new Buffer(3);
       data.write("off");
       callback(this.RESULT_SUCCESS, data);
    }   
  }
};

module.exports = SensorCharacteristic;
