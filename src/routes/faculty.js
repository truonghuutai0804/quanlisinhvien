const express = require('express')
const router = express.Router()

const facultyController = require('../app/controllers/FacultyController')

router.get('/api/faculty', facultyController.index)

module.exports = router