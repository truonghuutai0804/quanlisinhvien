const express = require('express')
const router = express.Router()

const scoreController = require('../app/controllers/ScoreController')

// OFF CHAIN

router.get('/api/score', scoreController.index)

// router.get('/api/scoreSV/:MA_SV', scoreController.getDiem)

router.get('/api/scores/:MA_SV', scoreController.getTongDiemSV)

router.get('/api/scoreGV/:MA_GV', scoreController.getDiemGV)

router.get('/api/score/:MA_SV', scoreController.diemChiTiet)

router.post('/api/score/:MA_SV', scoreController.create)

// router.put('/api/score/:MA_NHP', scoreController.update)


//ON CHAIN
router.get('/api/scoreSV/:MA_SV', scoreController.getDiemBlockchainSV)

router.get('/api/scoreGV/Blockchain/:MA_NHP', scoreController.getDiemBlockchainGV)

router.get('/api/scoreAllSV/', scoreController.getDiemBlockchainAllSV)

router.get('/api/allScoreSV/:MA_SV', scoreController.getAllDiemBlockchainSV)

router.post('/api/scoreGV/:MA_NHP', scoreController.setDiemBlockchain)

router.put('/api/scoreAD/:MA_SV', scoreController.editDiemBlockchain)



module.exports = router