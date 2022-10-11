const express = require('express')
const router = express.Router()

const scoreController = require('../app/controllers/ScoreController')

router.get('/api/score', scoreController.index)
router.get('/api/score/:id', scoreController.diemChiTiet)

module.exports = router