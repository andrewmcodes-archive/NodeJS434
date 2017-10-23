const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const DeviceSchema = new Schema({
    device_id: {
        type: String,
        reqired: [true, 'Device id field is required']
    },
    timestamp: {
        type: Number,
        reqired: [true, 'Timestamp field is required']
    },
    temperature: {
        type: Number,
        reqired: [true, 'Temperature field is required']
    }
}
);
//Device model represents device collection
const Device = mongoose.model('device', DeviceSchema);
module.exports = Device;