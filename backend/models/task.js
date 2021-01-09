const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    name: String,
    teamID: String,
    description: String,
    deadline: Date,
    status: String
})

const Task = mongoose.model('task' , TaskSchema);

module.exports = Task;