const express = require('express')
const router = express.Router()

const levelController = require('../app/controllers/LevelController')

router.get('/api/level', levelController.index)

module.exports = router