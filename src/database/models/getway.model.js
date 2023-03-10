const mongoose = require('mongoose');
const mongooseSerial = require("mongoose-serial")
let getway = new mongoose.Schema({
    serial_number: { type: String, trim: true, unique: true },
    name: { type: String, required: true, trim: true, unique: true },
    ip: { type: String, required: true, trim: true },
    devices: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Device' }],
        default: []
    },
});
getway.plugin(mongooseSerial, { field: "serial_number" });
module.exports = mongoose.model('Getway', getway);