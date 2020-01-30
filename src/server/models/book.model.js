const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
  title     : {type: String, required: [true]},
  vendorId  : {type: String, required: [true]},
  author    : {type: String, required: [true]}
})

const Book = mongoose.model('Book', BookSchema)
module.exports = Book