/*
Device.find({ temperature: /^75/ }, callback);
This performs a search for all documents with a temperature property that begins with "75" 
and returns the result as an array of devices to the callback.
*/

const express = require('express');
const router = express.Router();
const Device = require('../models/devices');

//Should retrieve all values in the form of a JSON Array
router.get('/temp', function(req,res, next){
    // res.send({type: 'GET'});
    // res.send(device);
    Device.find(function (err, devices) {
        if (err) return console.error(err);
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
    res.send({type:'GET'});
    });

//Should retrieve the highest submission
router.get('/temp/highest',function(req,res){
    res.send({type:'GET'});
    });

//Should retrieve the lowest submission
router.get('/temp/lowest',function(req,res){
    res.send({type:'GET'});
});

//Should retrieve the average submission
router.get('/temp/average',function(req,res){
    res.send({type:'GET'});
});

//Should retrieve all values for the requested device ID. Return a 404 error if the
//device ID is not found. You should not include the device_id in the results.
router.get('/temp/:id',function(req,res){
    res.send({type:'GET'});
});

//Should retrieve the latest submission for that device. The response should not
//include the device_id
router.get('/temp/:id/latest',function(req,res){
    res.send({type:'GET'});
});

//Should retrieve the highest submission for that device. The response should not
//include the device_id
router.get('/temp/:id/highest',function(req,res){
    res.send({type:'GET'});
});

//Should retrieve the lowest submission for that device. The response should not
//include the device_id
router.get('/temp/:id/lowest',function(req,res){
    res.send({type:'GET'});
});

//Should retrieve the average submission for that device. The response should not
//include the device_id
router.get('/temp/:id/average',function(req,res){
    res.send({type:'GET'});
});

// Allows us to export to another file
module.exports = router;