const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wannabeEmployeeSchema = new Schema({
    name: String,
    nickname: String,
    email: { type: String, unique: true },
    picture: String,
    sub: String

})

const wannabeEmployee = mongoose.model('wannabeEmployee', wannabeEmployeeSchema);

module.exports = wannabeEmployee;
