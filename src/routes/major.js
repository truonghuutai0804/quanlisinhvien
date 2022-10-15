const express = require('express')
const router = express.Router()

const majorController = require('../app/controllers/MajorController')

router.get('/api/major', majorController.index)

router.post('/api/major', majorController.create)

router.put('/api/major/:MA_CN', majorController.update)

router.delete('/api/major/:MA_CN', majorController.delete)


module.exports = router