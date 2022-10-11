const express = require('express')
const router = express.Router()

const facultyController = require('../app/controllers/FacultyController')

router.get('/api/faculty', facultyController.index)

router.post('/api/faculty', facultyController.create)

router.put('/api/faculty/:id', facultyController.update)

router.delete('/api/faculty/:id', facultyController.delete)


module.exports = router