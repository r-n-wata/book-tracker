const express = require('express')
const router = express.Router()
const archiveController = require('../controllers/archive') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', archiveController.getBooks)



module.exports = router