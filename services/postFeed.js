var express = require('express');
var router = express.Router();
var geocoder = require('geocoder');
var Food = require('../database/food.js');
var Zipped = require('../database/zipped.js');

function displayPostcode(address) {
  for (p = address.length-1; p >= 0; p--) {
    if (address[p].types.indexOf("postal_code") != -1) {
       console.log(address[p].long_name);
       return address[p].long_name;
    }
  }
}

router.post('/',function(req,res){
  // Reverse Geocoding
  geocoder.reverseGeocode( req.body.latitude, req.body.longitude, function ( err, data ) {
    // do something with data
    //console.log(data.results[0]);
    var zipVal = displayPostcode(data.results[0].address_components);
    console.log("Pin::" + zipVal);
    Zipped.findOne({ zipcode: zipVal }, function( err, data ){
      if(err){
        console.log("Err1");
        console.log(err);
      }
      var result;
      var food = Food();
      food.zipcode = zipVal;
      food.latitude = req.body.latitude;
      food.longitude = req.body.longitude;
      food.name = req.body.name;
      food.quantity = req.body.quantity;
      food.uid = req.body.uid;
      food.save(function(err,data1){
        if(err){
          console.log(err);
        }
        console.log(data1);
        result = data1;
      });
      if(data){
        console.log("Err2");
        data.locations.push({latitude:req.body.latitude,longitude:req.body.longitude,uid:req.body.uid});
      } else {
        console.log("Err3");
        var zipped = Zipped();
        zipped.zipcode = zipVal;
        zipped.locations.push({latitude:req.body.latitude,longitude:req.body.longitude,uid:req.body.uid});
        zipped.save(function(err){
          if(err){
            console.log(err);
          }
        });
      }
    });
    // Food.findOne({ zipcode: zipVal }, function( err, data ){
    //   if(err){
    //     console.log(err);
    //   }
    //   if(data){
    //     console.log(data);
    //   }
    //
    // });
  });
  console.log(req.body);
});

/*
  Exporting the postFeed route
*/
module.exports = router;
