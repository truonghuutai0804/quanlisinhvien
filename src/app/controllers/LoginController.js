const sequelize = require('../config/connectDB')
const { QueryTypes } = require('sequelize');

class LoginController {
    // [POST] /api/login
    async login(req, res, next){
        var username = req.body.username
        var password = req.body.password
        if(username !== '' && password !== ''){
            if(username.length === 5){
                try {
                    const dataLogin = await sequelize.query(`SELECT MA_GV, HOTEN_GV, MA_CD FROM teachers WHERE MA_GV LIKE '%${username}' AND MATKHAU_GV LIKE '%${password}'`, { type: QueryTypes.SELECT })
                    if (dataLogin.length != 0){
                        res.json({ 
                            message: 'SUCCESS',
                            res: 'TEACHER',
                            dataLogin
                         })
                    }
                    else{
                        res.json({ message: 'FAIL' })
                    }
                } catch (error) {
                    res.json({ message: error })
                }
            }else{
                try {
                    const dataLogin = await sequelize.query(`SELECT MA_SV, HOTEN_SV FROM students WHERE MA_SV LIKE '%${username}' AND MATKHAU_SV LIKE '%${password}'`, { type: QueryTypes.SELECT })
                    if (dataLogin.length != 0){
                        res.json({ 
                            message: 'SUCCESS',
                            res: 'STUDENT',
                            dataLogin
                         })
                    }
                    else{
                        res.json({ message: 'FAIL' })
                    }
                } catch (error) {
                    res.json({ message: error })
                }
            }
            
        }else{
            res.json({ message: 'ERR' });
        }
    }

    // [GET] /api/account
    async account(req, res, next){
        const dataAdmin = await sequelize.query(`SELECT MA_GV, HOTEN_GV, MATKHAU_GV FROM teachers WHERE MA_CD LIKE '01'`, { type: QueryTypes.SELECT })
        const dataPDT = await sequelize.query(`SELECT MA_GV, HOTEN_GV, MATKHAU_GV FROM teachers WHERE MA_CD LIKE '02'`, { type: QueryTypes.SELECT })
        const dataGV = await sequelize.query(`SELECT MA_GV, HOTEN_GV, MATKHAU_GV FROM teachers WHERE MA_CD LIKE '03'`, { type: QueryTypes.SELECT })
        const dataSV = await sequelize.query(`SELECT MA_SV, HOTEN_SV, MATKHAU_SV FROM students`, { type: QueryTypes.SELECT })

        res.json({ 
            dataAdmin,
            dataPDT,
            dataGV,
            dataSV,
            message: 'SUCCESS'
        })
    }

}

module.exports = new LoginController