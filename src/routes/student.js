const express = require('express')
const router = express.Router()

const studentController = require('../app/controllers/StudentController')

router.get('/api/student', studentController.index)

module.exports = router