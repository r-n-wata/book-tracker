const express = require('express')
const router = express.Router()
const booksController = require('../controllers/books') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, booksController.getBooks)

router.post('/createBook', booksController.createBook)

router.put('/markReading', booksController.markReading)

router.put('/markArchive', booksController.markArchive)

router.put('/markComplete', booksController.markComplete)

router.put('/unmarkComplete', booksController.unmarkComplete)

router.delete('/deleteBook', booksController.deleteBook)

module.exports = router