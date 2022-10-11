const sequelize = require('../config/connectDB')
const { QueryTypes } = require('sequelize');

class YearController {
    // [GET] /api/year
    async index(req,res){
        try {
            const data = await sequelize.query(`SELECT * FROM years`, { type: QueryTypes.SELECT, })
            return res.json({
                data: data,
                status: 400
            })            
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }
}

module.exports = new YearController 