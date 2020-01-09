const mongoose = require('mongoose')

const AuthorSchema = new mongoose.Schema({
  name      : {type: String, required: [true]},
  vendorId  : {type: String, required: [true]},
  about     : String
})

const Author = mongoose.model('Author', AuthorSchema)
module.exports = Author