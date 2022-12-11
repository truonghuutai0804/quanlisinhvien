const express = require('express');
const router = express.Router();

const loginController = require('../app/controllers/LoginController')

router.post('/api/login', loginController.login)
router.get('/api/account', loginController.account)
router.put('/api/account/:username', loginController.khoaTaiKhoan)



module.exports = router;