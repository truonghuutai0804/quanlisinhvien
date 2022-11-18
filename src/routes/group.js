const express = require('express')
const router = express.Router()

const groupController = require('../app/controllers/GroupController')

router.get('/api/group', groupController.index)

router.get('/api/groups/:MA_MH', groupController.getGroups)

router.post('/api/group', groupController.create)

router.put('/api/group/:MA_NHP', groupController.update)

router.delete('/api/group/:MA_NHP', groupController.delete)


module.exports = router