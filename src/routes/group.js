const express = require('express')
const router = express.Router()

const groupController = require('../app/controllers/GroupController')

router.get('/api/group', groupController.index)

router.post('/api/group', groupController.create)

module.exports = router