const express = require('express')
const router = express.Router()

const classController = require('../app/controllers/ClassController')

router.get('/api/class', classController.index)

module.exports = router