const sequelize = require('../config/connectDB')
const { QueryTypes } = require('sequelize');

class LoginController {
    // [POST] /api/login
    async login(req, res, next){
        var username = req.body.username
        var password = req.body.password
        if(username !== '' && password !== ''){
            if(username.length === 5){
                const check1 = await sequelize.query(`SELECT MA_GV FROM teachers WHERE MA_GV LIKE '%${username}'`, { type: QueryTypes.SELECT })
                if ( check1.length != 0) {
                    const check = await sequelize.query(`SELECT MA_GV FROM teachers WHERE MA_GV LIKE '%${username}' AND TRANGTHAI_GV = 0`, { type: QueryTypes.SELECT })
                    if ( check.length != 0) {
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
                        res.json({message: 'LOCK'})
                    }
                }else{
                    res.json({message: 'EXIST'})
                }  
            }else{
                const check = await sequelize.query(`SELECT MA_SV FROM students WHERE MA_SV LIKE '%${username}'`, { type: QueryTypes.SELECT })
                if ( check.length != 0) {
                    const check = await sequelize.query(`SELECT MA_SV FROM students WHERE MA_SV LIKE '%${username}' AND TRANGTHAI_SV = 0`, { type: QueryTypes.SELECT })
                    if ( check.length != 0) {
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
                    }else{
                        res.json({message: 'LOCK'})
                    }
                }else{
                    res.json({message: 'EXIST'})
                }  
            }
        }else{
            res.json({ message: 'ERR' });
        }
    }

    // [GET] /api/account
    async account(req, res, next){
        const dataAdmin = await sequelize.query(`SELECT MA_GV, HOTEN_GV FROM teachers WHERE MA_CD LIKE '01'`, { type: QueryTypes.SELECT })
        const dataPDT = await sequelize.query(`SELECT MA_GV, HOTEN_GV, TRANGTHAI_GV FROM teachers WHERE MA_CD LIKE '02'`, { type: QueryTypes.SELECT })
        const dataGV = await sequelize.query(`SELECT MA_GV, HOTEN_GV, TRANGTHAI_GV FROM teachers WHERE MA_CD LIKE '03'`, { type: QueryTypes.SELECT })
        const dataSV = await sequelize.query(`SELECT MA_SV, HOTEN_SV, TRANGTHAI_SV FROM students`, { type: QueryTypes.SELECT })

        res.json({ 
            dataAdmin,
            dataPDT,
            dataGV,
            dataSV,
            message: 'SUCCESS'
        })
    }

    //[PUT] /api/account/:username
    async khoaTaiKhoan(req, res, next){
        var username = req.params.username
        var TRANGTHAI
        if(req.body.TRANGTHAI_GV){
            TRANGTHAI = req.body.TRANGTHAI_GV
        }else{
            TRANGTHAI = req.body.TRANGTHAI_SV
        }

        if(TRANGTHAI === 1){
            TRANGTHAI = 0
        }else{
            TRANGTHAI = 1
        }
        if(username.length === 5){
            try {
                await sequelize.query(`UPDATE teachers SET TRANGTHAI_GV = '${TRANGTHAI}' WHERE MA_GV LIKE '%${username}'`, { type: QueryTypes.UPDATE })
                    res.json({ 
                        message: 'SUCCESS',
                        result: TRANGTHAI
                        })
            } catch (error) {
                res.json({ message: error })
            }
        }else{
            try {
                await sequelize.query(`UPDATE students SET TRANGTHAI_SV = '${TRANGTHAI}' WHERE MA_SV LIKE '%${username}'`, { type: QueryTypes.UPDATE })
                    res.json({ 
                        message: 'SUCCESS',
                        result: TRANGTHAI
                    })
            } catch (error) {
                res.json({ message: error })
            }
        }
            
    }

}

module.exports = new LoginController