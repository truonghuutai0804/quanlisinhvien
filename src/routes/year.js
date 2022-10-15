const express = require('express')
const router = express.Router()

const yearController = require('../app/controllers/YearController')

router.get('/api/year', yearController.index)

router.post('/api/year', yearController.create)


module.exports = router