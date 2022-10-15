const express = require('express')
const router = express.Router()

const scoreController = require('../app/controllers/ScoreController')

router.get('/api/score', scoreController.index)

router.get('/api/score/:MA_SV', scoreController.diemChiTiet)

router.post('/api/score/:MA_SV', scoreController.create)

router.put('/api/score/:MA_SV', scoreController.update)


module.exports = router