# NodeJS434

# Project:
In this project, you will use Node.js to implement a RESTful API that consumes content produced by an imaginary IoT (Internet of Things) device. An IoT device is usually some sort of sensor that sends data to a service that stores the data and produces results. In our case, we’re going to simulate a network of temperature sensors for a factory. This factory has 20 different devices that monitor temperature throughout the facility and send the data to a single backend server. This backend server is a Node.js Express server that accepts the data via an HTTP POST method.
Your job will be to implement both the server and a temperature sensor (called Producer and Consumer). Your temperature sensor should send a timestamp, location ID, and temperature value. Your server should accept that value and store it in a JSON document. Your server should then supply the results back with an HTTP GET request.

# Server Endpoints: 
*  http://localhost:port/temp
*     o POST: Should add a new value to the server’s dataset supplied by the IOT device 
*     o GET: Should retrieve all values in the form of a JSON Array
*  http://localhost:port/temp/latest
*     o GET:Shouldretrievethemostrecentsubmission
*  http://localhost:port/temp/highest
*     o GET:Shouldretrievethehighestsubmission
*  http://localhost:port/temp/lowest
*     o GET:Shouldretrievethelowestsubmission
*  http://localhost:port/temp/average
*     o GET:Shouldretrievetheaveragesubmission
*  http://localhost:port/temp/{device_id}
*     o GET: Should retrieve all values for the requested device ID. Return a 404 error if the device ID is not found. You should not include the device_id in the results.
*  http://localhost:port/temp/{device_id}/latest
*     o GET: Should retrieve the latest submission for that device. The response should not include the device_id
*  http://localhost:port/temp/{device_id}/highest
*     o GET: Should retrieve the highest submission for that device. The response should not include the device_id
*  http://localhost:port/temp/{device_id}/lowest
*     o GET: Should retrieve the lowest submission for that device. The response should not include the device_id
*  http://localhost:port/temp/{device_id}/average
*     o GET: Should retrieve the average submission for that device. The response should not include the device_id

# SET UP:
First, make sure you have Node and NPM installed
* node -v — returns node version in terminal

Next, download and install MongoDB. You must have the MongoDB server running in the background when testing 
* mongod - starts MongoDB server in terminal

Then, you need the following packages from npm. Run the following commands in terminal:
* npm install -g body-parser
* npm install -g nodemon
* npm install -g express
* npm install -g mongoose
* npm install -g lodash

# Other Software:
* Postman - Allows you to specify request type and send data to DB
* Robo3t - Allows you to see visualization of MongoDB server
