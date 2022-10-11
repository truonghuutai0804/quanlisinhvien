const sequelize = require('../config/connectDB')
const { QueryTypes } = require('sequelize');

class FacultyController {
    // [GET] /api/faculty
    async index(req,res){
        try {
            const data = await sequelize.query(`SELECT * FROM faculties`, { type: QueryTypes.SELECT, })
            return res.json({
                data: data,
                status: 400
            })            
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }
}

module.exports = new FacultyController 