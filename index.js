const express = require('express');
const router = express.Router();
var _ = require('lodash');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Device = require('./models/devices');
mongoose.Promise = require('bluebird');

//set up express app
const app = express();

//connect to mongodb 
mongoose.connection.openUri('mongodb://localhost/iotdb',{ config: { autoIndex: false } });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connect to MongoDB: Error:'));
db.once('open', function callback () {
    console.log('Connect to MongoDB: Successful');
});

//Servers static express file
app.use(express.static('public'));

//Parse JSON Data
app.use(bodyParser.json());

//use the routes specified below
app.use(router);

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


//Should retrieve all values in the form of a JSON Array
router.get('/temp', function(req,res, next){
    // res.send({type: 'GET'});
    // res.send(device);
    Device.find(function (err, devices) {
        if (err) throw err;
        res.send(devices);
      })
});

//Should add a new value to the server’s dataset supplied by the IOT device
router.post('/temp', function(req,res, next){
    Device.create(req.body).then(function(device){
       res.send(device);
    }).catch(next);
});

//Should retrieve the most recent submission
router.get('/temp/latest',function(req,res){
    Device.find(function (err, devices) {
        if (err) return console.error(err);
        var ordered = _.orderBy(devices, ['timestamp']);
        res.send(ordered[0]);
      })
    });

//Should retrieve the highest submission
router.get('/temp/highest',function(req,res){
    Device.find(function (err, devices) {
        if (err) return console.error(err);
        var ordered = _.orderBy(devices, ['temperature'],['desc']);
        res.send(ordered[0]);
      })
    });

//Should retrieve the lowest submission
router.get('/temp/lowest',function(req,res){
    Device.find(function (err, devices) {
        if (err) return console.error(err);
        var ordered = _.orderBy(devices, ['temperature'],['asc']);
        res.send(ordered[0]);
      })
});

//Should retrieve the average submission
router.get('/temp/average',function(req,res){
    Device.find(function (err, devices) {
        if (err) return console.error(err);
        var map = _.map(devices,'temperature');
        var mean = _.mean(map);
        res.send(String(mean));
      })
});

//Should retrieve all values for the requested device ID. Return a 404 error if the
//device ID is not found. You should not include the device_id in the results.
router.get('/temp/:id',function(req,res, next){
    z = req.params.id;
    Device.find({ device_id : z }, function (err, devices) {
        if (err) throw err;
        res.send(devices);
        })
    
});

//Should retrieve the latest submission for that device. The response should not
//include the device_id
router.get('/temp/:id/latest',function(req,res){
    z = req.params.id;
    Device.find({ device_id : z }, function (err, devices) {
        if (err) throw err;
        var ordered = _.orderBy(devices, ['timestamp']);
        res.send(ordered[0]);
        })
});

//Should retrieve the highest submission for that device. The response should not
//include the device_id
router.get('/temp/:id/highest',function(req,res){
    z = req.params.id;
    Device.find({ device_id : z }, function (err, devices) {
        if (err) throw err;
        var ordered = _.orderBy(devices, ['timestamp'],['desc']);
        res.send(ordered[0]);
        })
});

//Should retrieve the lowest submission for that device. The response should not
//include the device_id
router.get('/temp/:id/lowest',function(req,res){
    z = req.params.id;
    Device.find({ device_id : z }, function (err, devices) {
        if (err) throw err;
        var ordered = _.orderBy(devices, ['timestamp'],['asc']);
        res.send(ordered[0]);
        })
});

//Should retrieve the average submission for that device. The response should not
//include the device_id
router.get('/temp/:id/average',function(req,res){
    z = req.params.id;
    Device.find({ device_id : z }, function (err, devices) {
        if (err) throw err;
    var map = _.map(devices,'temperature');
    var mean = _.mean(map);
    res.send(String(mean));
    })
});

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// error handling
app.use(function(err, req, res, next){
     //attachs error code 422
     res.sendStatus(422).send({error: err.message});
});




// listen for set up variable in enviornment or port 4000
app.listen(process.env.port || 4000, function(){
    console.log('listening on port 4000')
});