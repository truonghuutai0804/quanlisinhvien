const express = require('express')
const router = express.Router()

const yearController = require('../app/controllers/YearController')

router.get('/api/year', yearController.index)

router.post('/api/year', yearController.create)

router.put('/api/year/:MA_NH', yearController.update)

router.delete('/api/year/:MA_NH', yearController.delete)

module.exports = router