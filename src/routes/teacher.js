const express = require('express')
const router = express.Router()

const teacherController = require('../app/controllers/TeacherController')

router.get('/api/teacher', teacherController.teacher)
router.get('/api/trainer', teacherController.trainer)

module.exports = router