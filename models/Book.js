const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
  // bookId:{
  //   type: String,
  //   required: true
  // },
  title: {
    type: String,
    required: true,
  },
  author:{
    type: Array,
    required: true
  },
  image:{
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  archive: {
    type: Boolean,
    required: true,
  },
  reading: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Book', BookSchema)