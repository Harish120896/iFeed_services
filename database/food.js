var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Food = new Schema({
    name: { type: String, required: true},
    quantity: { type: String, required: true },
    latitude: { type: String, required: true},
    longitude: { type: String, required: true},
    time: { type: String, required: true},
    uid: { type: String, required: true},
    address: { type: String, required: true}
});

module.exports = mongoose.model('Food', Food);
