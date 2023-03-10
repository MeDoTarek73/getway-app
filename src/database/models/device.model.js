const mongoose = require('mongoose');
let device = new mongoose.Schema({
    vendor: { type: String, required: true, trim: true },
    status: { type: String, required: true, trim: true, default: "offline", enum: ["online", "offline"] },
    created_date: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Device', device);