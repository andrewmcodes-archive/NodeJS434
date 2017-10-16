const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Device = require('./models/devices');
mongoose.Promise = require('bluebird');

//set up express app
const app = express();

//connect to mongodb 
mongoose.connection.openUri('mongodb://localhost/iotdb');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connect to MongoDB: Error:'));
db.once('open', function callback () {
    console.log('Connect to MongoDB: Successful');
});


//Servers static express file
app.use(express.static('public'));

//Parse JSON Data
app.use(bodyParser.json());

// initialize routes
app.use('/api',require('./routes/api'));


//error handling
app.use(function(err, req, res, next){
     //attachs error code 422
     res.sendStatus(422).send({error: err.message});
});

// listen for set up variable in enviornment or port 4000
app.listen(process.env.port || 4000, function(){
});