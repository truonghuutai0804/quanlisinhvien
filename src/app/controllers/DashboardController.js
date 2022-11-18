const sequelize = require('../config/connectDB')
const { QueryTypes } = require('sequelize');

class DashboardController {
    // [GET] /dashboard
    async index(req,res){
        try {
            const dataSV = await sequelize.query(
                'SELECT COUNT(*) AS SO_LUONG_SV FROM students', 
                { type: QueryTypes.SELECT, }
            )
            const dataGV = await sequelize.query(
                'SELECT COUNT(*) AS SO_LUONG_GV FROM teachers WHERE MA_CD = 02', 
                { type: QueryTypes.SELECT, }
            )
            const dataPDT = await sequelize.query(
                'SELECT COUNT(*) AS SO_LUONG_PDT FROM teachers WHERE MA_CD = 03', 
                { type: QueryTypes.SELECT, }
            )
            const dataDiem = await sequelize.query(
                `SELECT (SUM(DIEM_SO*TIN_CHI)/(COUNT(*)*TIN_CHI)) AS TONG FROM scores 
                JOIN groups ON scores.MA_NHP = groups.MA_NHP 
                JOIN subjects ON groups.MA_MH = subjects.MA_MH`,
                { type: QueryTypes.SELECT, }
            )
            return res.json({
                dataSV,
                dataGV, 
                dataPDT, 
                dataDiem,
                status: 400
            })
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }
}

module.exports = new DashboardController