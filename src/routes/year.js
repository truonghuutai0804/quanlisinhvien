const express = require('express')
const router = express.Router()

const yearController = require('../app/controllers/YearController')

router.get('/api/year', yearController.index)

module.exports = router