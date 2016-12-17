var express = require('express');
var router = express.Router();
var geocoder = require('geocoder');
var Food = require('../database/food.js');
var GeoFire = require('geofire');
var firebase = require('firebase');
var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert("./ifeed-4be93-firebase-adminsdk-kvaq6-44b99749a0.json"),
  databaseURL: "https://ifeed-4be93.firebaseio.com"
});

var db = admin.database();
var ref = db.ref("geoLoc");
var geoFire = new GeoFire(ref);

router.post('/',function(req,res){
  var geoQuery = geoFire.query({
    center: [req.body.latitude, req.body.longitude],
    radius: req.body.radius
  });
});

/*
  Exporting the postFeed route
*/
module.exports = router;
