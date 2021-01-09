const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DocumentSchema = new Schema({
    name: String,
    link: String

})

const Document = mongoose.model('document', DocumentSchema);

module.exports = Document;