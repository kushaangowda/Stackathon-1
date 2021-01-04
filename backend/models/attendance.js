const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AttendaceSchema = new Schema({
    empID: Schema.Types.ObjectId,
    attendance: [String]

})

const Attendance = mongoose.model('attendance', AttendaceSchema);

module.exports = Attendance;