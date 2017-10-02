var express = require('express');
var app = express();
var fs = require("fs");
var _ = require('lodash');

//GET, console logs data
app.get('/temp', function (req, res) {
   fs.readFile( __dirname + "/" + "packet.json", 'utf8', function (err, data) {
       console.log(JSON.stringify(data, null, 2));
       res.end( data );
   });
})

var dev = {
    "dev4" : {
       "device_id" : "garage",
       "timestamp" : "115063460034",
       "temperature" : "50.5",
    }
 }
 
 //POST, adds new device to JSON 
 app.post('/temp', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/" + "packet.json", 'utf8', function (err, data) {
        data = JSON.parse( data );
        data["dev4"] = dev["dev4"];
        // console.log( data );
        res.end( JSON.stringify(data));
    });
 })

 //Not working
app.get('/latest', function (req, res) {
    fs.readFile( __dirname + "/" + "packet.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        var latest = _.maxBy(data, 'timestamp');
        // _.map(data, 'pets[0].temperature');
        // var obj1 = _.pick(data,[])



        console.log(data);
        for(var myKey in data) {
            console.log("key:"+myKey+", value:"+data[myKey]);
         };
        
       
        res.end( JSON.stringify(data));
       
    });

    
});

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})