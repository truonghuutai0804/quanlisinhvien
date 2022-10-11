const express = require('express')
const router = express.Router()

const semesterController = require('../app/controllers/SemesterController')

router.get('/api/semester', semesterController.index)

module.exports = router