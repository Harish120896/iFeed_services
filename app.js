var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

/*
  Establishing connection to database
*/
mongoose.connect('mongodb://127.0.0.1/fd');
var db = mongoose.connection;
db.once('open', function callback () {
  console.log("Connected to food database");
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// postFeed route
var postFeed = require('./services/postFeed.js');
app.use('/postFeed',postFeed);

// assignFeed route
var assignFeed = require('./services/assignFeed.js');
app.use('/assignFeed',assignFeed);

app.listen(3000,function(){
    console.log("App running on 3000");

});
