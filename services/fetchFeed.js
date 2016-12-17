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
    center: [req.body.latitude,req.body.longitude],
    radius: req.body.radius
  });
  var onReadyRegistration = geoQuery.on("ready", function() {
    console.log("GeoQuery has loaded and fired all other events for initial data");
    console.log(arr);
    var fRes = [];
    var cursor = Food.find({_id:{"$in":arr}}).cursor();
    cursor.on("data",function(doc){
      console.log(doc);
      fRes.push(doc);
    });
    cursor.on("close",function(){
      res.send(fRes);
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
