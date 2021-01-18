const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthSchema = new Schema({
    admin: [String],
    employee: [String],

})

const Auth = mongoose.model('auth', AuthSchema);

module.exports = Auth;
