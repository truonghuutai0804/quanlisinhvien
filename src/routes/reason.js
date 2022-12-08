const express = require('express')
const router = express.Router()

const reasonController = require('../app/controllers/ReasonController')

router.get('/api/reason', reasonController.index)

router.post('/api/reason', reasonController.create)

router.put('/api/reason/:MA_LD', reasonController.update)

router.delete('/api/reason/:MA_LD', reasonController.delete)

module.exports = router