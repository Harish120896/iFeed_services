var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Drivers = new Schema({
    vid: { type: String, required: true},
    capacity: { type: String, required: true},
    latitude: { type: String, required: true},
    longitude: { type: String, required: true},
    zipcode: { type: String, required: true}
});

module.exports = mongoose.model('Drivers', Drivers);
