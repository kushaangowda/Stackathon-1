const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    email: String,
    name: String,
    teamID: Schema.Types.ObjectId,
    Role: String,
    Post: String,
    Salary: Number,
    attendance: Number,
})

const Employee = mongoose.model('employee' , EmployeeSchema);

module.exports = Employee;
