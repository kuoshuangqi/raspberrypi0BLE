var util = require('util');
var bleno = require('../..');

var SensorCharacteristic = require('./sensor-characteristic');

// set UUID and chracteristics
function SensorService() {
    bleno.PrimaryService.call(this, {
        uuid: '09876543210987654321098765432109',
        characteristics: [
            new SensorCharacteristic(),
        ]
    });
}

util.inherits(SensorService, bleno.PrimaryService);

module.exports = SensorService;
