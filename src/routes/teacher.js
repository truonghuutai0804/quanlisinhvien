const express = require('express')
const router = express.Router()

const teacherController = require('../app/controllers/TeacherController')

router.get('/api/teacher', teacherController.teacher)

router.get('/api/teacher/:MA_GV', teacherController.getTeacher)

router.get('/api/trainer', teacherController.trainer)

router.post('/api/teacher', teacherController.createTeacher)

router.post('/api/trainer', teacherController.createTrainer)

router.put('/api/trainteacher/:MA_GV', teacherController.update)

router.delete('/api/trainteacher/:MA_GV', teacherController.delete)



module.exports = router