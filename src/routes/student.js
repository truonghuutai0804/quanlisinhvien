const express = require('express')
const router = express.Router()

const studentController = require('../app/controllers/StudentController')

router.get('/api/student', studentController.index)

router.get('/api/student/:MA_SV', studentController.getSV)

router.post('/api/student', studentController.create)

router.put('/api/student/:MA_SV', studentController.update)

router.delete('/api/student/:MA_SV', studentController.delete)

module.exports = router