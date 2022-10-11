const sequelize = require('../config/connectDB')
const { QueryTypes } = require('sequelize');

class SemesterController {
    // [GET] /api/semester
    async index(req,res){
        try {
            const data = await sequelize.query(`SELECT * FROM semesters`, { type: QueryTypes.SELECT, })
            return res.json({
                data: data,
                status: 400
            })          
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }
}

module.exports = new SemesterController