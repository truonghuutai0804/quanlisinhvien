const sequelize = require('../config/connectDB')
const { QueryTypes } = require('sequelize');

class MajorController {
    // [GET] /api/major
    async index(req,res){
        try {
            const data = await sequelize.query('SELECT * FROM majors JOIN faculties ON majors.MA_KHOA = faculties.MA_KHOA', { type: QueryTypes.SELECT, })
            return res.json({
                data: data,
                status: 400
            })          
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }
}

module.exports = new MajorController