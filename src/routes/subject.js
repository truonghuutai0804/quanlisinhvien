const express = require('express')
const router = express.Router()

const subjectController = require('../app/controllers/SubjectController')

router.get('/api/subject', subjectController.index)

router.get('/api/subject/:MA_GV', subjectController.getMonHoc)

router.get('/api/subjects/:MA_SV', subjectController.getDangKyHocPhan)

router.post('/api/subject', subjectController.create)

router.put('/api/subject/:MA_MH', subjectController.update)

router.delete('/api/subject/:MA_MH', subjectController.delete)


module.exports = router