const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    email: {type : String , unique: true},
    name: String,
    teamID: String,
    Role: String,
    Post: String,
    Salary: Number,
    attendance: Number,
})

const Employee = mongoose.model('employee' , EmployeeSchema);

module.exports = Employee;
