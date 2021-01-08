const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PayrollRequestSchema = new Schema({
    empID: String,
    description: String,
    Status: String
})

const Request = mongoose.model('payrollrequest' , PayrollRequestSchema);

module.exports = Request;