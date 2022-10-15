const sequelize = require('../config/connectDB')
const { QueryTypes } = require('sequelize');

class GroupController {
    // [GET] /api/group
    async index(req,res){
        try {
            const data = await sequelize.query(`SELECT * FROM groups JOIN subjects ON groups.MA_MH = subjects.MA_MH 
                                                    JOIN teachers ON groups.MA_GV = teachers.MA_GV
                                                    JOIN semesters ON groups.MA_HK = semesters.MA_HK 
                                                    JOIN years ON groups.MA_NH = years.MA_NH `, 
                                                { type: QueryTypes.SELECT, })
            return res.json({
                data: data,
                status: 400
            })            
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }

    async create(req,res){
        try {
            const maNHP = req.body.MA_NHP
            const maMH = req.body.MA_MH
            const maGV = req.body.MA_GV
            const maHK = req.body.MA_HK
            const maNH = req.body.MA_HK
            const soLuong = req.body.SO_LUONG
            await sequelize.query(`INSERT INTO groups (MA_NHP, MA_MH, MA_GV, MA_HK, MA_NH, SO_LUONG)
                                         VALUES ('${maNHP}', '${maMH}', '${maGV}', '${maHK}', '${maNH}', '${soLuong}')`,
                                    { type: QueryTypes.INSERT })
            return res.json({
                message: 'SUCCESS'
            })            
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }
}

module.exports = new GroupController 