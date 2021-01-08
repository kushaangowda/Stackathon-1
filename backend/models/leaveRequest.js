const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LeaveRequestSchema = new Schema({
    empID: String,
    description: String,
    start: Date,
    duration: Number,
    Status: String
})

const Request = mongoose.model('leaverequest' , LeaveRequestSchema);

module.exports = Request;