const express = require('express')
const router = express.Router()

const majorController = require('../app/controllers/MajorController')

router.get('/api/major', majorController.index)

module.exports = router