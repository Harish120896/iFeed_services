var firebase = require('firebase');
var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert("./ifeed-4be93-firebase-adminsdk-kvaq6-44b99749a0.json"),
  databaseURL: "https://ifeed-4be93.firebaseio.com"
});

module.exports = admin.database();

//db.ref("geoLoc");
