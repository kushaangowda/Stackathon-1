const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
    name: String,
    members: [Schema.Types.ObjectId]
})

const Team = mongoose.model('team', TeamSchema);

module.exports = Team;