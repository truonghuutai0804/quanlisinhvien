const express = require('express')
const router = express.Router()

const teacherController = require('../app/controllers/TeacherController')

router.get('/api/teacher', teacherController.teacher)

router.get('/api/trainer', teacherController.trainer)

router.post('/api/trainteacher', teacherController.create)

router.put('/api/trainteacher/:MA_GV', teacherController.update)

router.delete('/api/trainteacher/:MA_GV', teacherController.delete)



module.exports = router