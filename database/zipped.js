var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Zipped = new Schema({
    zipcode: { type: String, required: true},
    locations: [{
      latitude: { type: String, required: true},
      longitude: { type: String, required: true},
      uid: { type: String, required: true}
    }]
});

module.exports = mongoose.model('Zipped', Zipped);
