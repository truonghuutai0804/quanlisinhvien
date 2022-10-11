const sequelize = require('../config/connectDB')
const { QueryTypes } = require('sequelize');

class TeacherController {
    // [GET] /api/teacher
    async teacher(req,res){
        try {
            const dataGV = await sequelize.query(`SELECT * FROM teachers JOIN levels ON teachers.MA_CD = levels.MA_CD `+
                                                `JOIN provinces ON teachers.MA_TINH = provinces.MA_TINH `+
                                                `WHERE teachers.MA_CD LIKE '02'`, { type: QueryTypes.SELECT, })
            return res.json({
                dataGV,
                status: 400
            })
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }

    //[GET] /api/trainer
    async trainer(req,res){
        try {
            const dataPDT = await sequelize.query(`SELECT * FROM teachers JOIN levels ON teachers.MA_CD = levels.MA_CD `+
                                                `JOIN provinces ON teachers.MA_TINH = provinces.MA_TINH `+
                                                `WHERE teachers.MA_CD LIKE '03'`, { type: QueryTypes.SELECT, })
            return res.status(200).json({
                dataPDT,
                status: 400
            })
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }
}

module.exports = new TeacherController