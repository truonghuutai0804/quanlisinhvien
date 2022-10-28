const express = require('express')
const router = express.Router()

const scoreController = require('../app/controllers/ScoreController')

router.get('/api/score', scoreController.index)

router.get('/api/scoreSV/', scoreController.getDiemBlockchainSV)

router.get('/api/scoreGV/', scoreController.getDiemBlockchainGV)

router.get('/api/scoreSV/:MA_SV', scoreController.getDiem)

router.get('/api/scoreGV/:MA_GV', scoreController.getDiemGV)

router.get('/api/score/:MA_SV', scoreController.diemChiTiet)

router.post('/api/score/:MA_SV', scoreController.create)

router.post('/api/score/', scoreController.create)

router.put('/api/score/:MA_NHP', scoreController.update)


module.exports = router