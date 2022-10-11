const sequelize = require('../config/connectDB')
const { QueryTypes } = require('sequelize');

class SubjectController {
    // [GET] /api/subject
    async index(req,res){
        try {
            const data = await sequelize.query(`SELECT * FROM subjects`, { type: QueryTypes.SELECT, })
            return res.json({
                data: data,
                status: 400
            })            
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }
}

module.exports = new SubjectController 