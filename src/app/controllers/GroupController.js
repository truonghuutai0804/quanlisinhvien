const sequelize = require('../config/connectDB')
const { QueryTypes } = require('sequelize');

class GroupController {
    // [GET] /api/group
    async index(req,res){
        try {
            const data = await sequelize.query(`SELECT * FROM groups JOIN subjects ON groups.MA_MH = subjects.MA_MH `+
                                             `JOIN teachers ON groups.MA_GV = teachers.MA_GV `+
                                             `JOIN semesters ON groups.MA_HK = semesters.MA_HK `+
                                             `JOIN years ON groups.MA_NH = years.MA_NH `, 
                                             { type: QueryTypes.SELECT, })
            return res.json({
                data: data,
                status: 400
            })            
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }
}

module.exports = new GroupController 