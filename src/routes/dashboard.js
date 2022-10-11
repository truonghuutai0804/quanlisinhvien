const express = require('express')
const router = express.Router()

const dashboardController = require('../app/controllers/DashboardController')

router.get('/api/dashboard', dashboardController.index)

module.exports = router