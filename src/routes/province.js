const express = require('express')
const router = express.Router()

const provinceController = require('../app/controllers/ProvinceController')

router.get('/api/province', provinceController.index)

module.exports = router