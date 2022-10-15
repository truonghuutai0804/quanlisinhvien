const express = require('express')
const router = express.Router()

const classController = require('../app/controllers/ClassController')

router.get('/api/class', classController.index)

router.post('/api/class', classController.create)

router.put('/api/class/:MA_LOP', classController.update)

router.delete('/api/class/:MA_LOP', classController.delete)

module.exports = router