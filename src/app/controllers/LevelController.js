const sequelize = require('../config/connectDB')
const { QueryTypes } = require('sequelize');

class LevelController {
    // [GET] /api/level
    async index(req,res){
        try {
            const data = await sequelize.query(`SELECT * FROM levels`, { type: QueryTypes.SELECT, })
            return res.status(200).json({
                data: data,
                status: 400
            })            
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }
}

module.exports = new LevelController 