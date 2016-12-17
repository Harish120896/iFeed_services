var express = require('express');
var router = express.Router();
//var geocoder = require('geocoder');
var Food = require('../database/food.js');

function shortestPath(locations) {

  var cLen = locations.length;

  var lat = [];
  var long = [];

  for( var i = 0; i < cLen; i++ ){
    lat.push(parseFloat(locations[i].latitude));
    long.push(parseFloat(locations[i].longitude));
  }

  console.log(lat);

  var latItr = 0;
  var lngItr = 0;

  var hCost = [];
  var vCost = [];
  var tCost = [];

  while( latItr < cLen ){
    tmp = 0;
    tmpDist = 0;
    while( tmp < cLen ){
      if( tmp != latItr ){
        tmpDist = Math.abs(lat[tmp] - lat[tmp]);
      }
      tmp += 1;
    }
    hCost.push(tmpDist);
    latItr += 1;
  }

  while( lngItr < cLen ){
    tmp = 0;
    tmpDist = 0;
    while( tmp < cLen ){
      if( tmp != latItr ){
        tmpDist = Math.abs(long[tmp] - long[tmp]);
      }
      tmp += 1;
    }
    vCost.push(tmpDist);
    lngItr += 1;
  }

  var itr = 0;

  while ( itr < cLen ){
    tCost.push(hCost[itr]+vCost[itr]);
    itr += 1;
  }

  var resItr = 0;
  var resVal = 0;

  if ( cLen > 0 ){
    resVal = tCost[0];
  }

  itr = 0;

  while( itr < cLen ){
    if( tCost[itr] < resVal ){
      resItr =  itr;
      resVal = tCost[itr];
    }
    itr += 1;
  }

  return {latitude:lat[resItr],longitude:long[resItr]};

}

router.post('/',function(req,res){
  Food.findOne({ zipcode: req.body.zipcode }, function( err, data ){
    if(err){
      console.log(err);
    }
    if(data){
      console.log("Locs:"+data.locations);
      var result = shortestPath(data.locations);
      console.log(result);
    } else {
      console.log("Data not there");
    }
  });
});

/*
  Exporting the assignFeed route
*/
module.exports = router;
