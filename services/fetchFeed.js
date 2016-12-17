var express = require('express');
var router = express.Router();
var geocoder = require('geocoder');
var mongoose = require('mongoose');
var Food = require('../database/food.js');
var GeoFire = require('geofire');
var db = require('./firebase.js');
var ref = db.ref("geoLoc");
var geoFire = new GeoFire(ref);

router.post('/',function(req,res){
  var arr = [];
  var geoQuery = geoFire.query({
    center: [parseFloat(req.body.latitude), parseFloat(req.body.longitude)],
    radius: parseFloat(req.body.radius)
  });
  var onReadyRegistration = geoQuery.on("ready", function() {
    console.log("GeoQuery has loaded and fired all other events for initial data");
    console.log(arr);
    var cursor = Food.find({_id:{"$in":arr}}).cursor();
    cursor.on("data",function(doc){
      console.log(doc);
    });
    cursor.on("close",function(){

    });
  });
  var onKeyEnteredRegistration = geoQuery.on("key_entered", function(key, location, distance) {
    console.log(key + " entered query at " + location + " (" + distance + " km from center)");
    arr.push(mongoose.Types.ObjectId(key));
  });

  console.log(geoQuery);
});

/*
  Exporting the postFeed route
*/
module.exports = router;
