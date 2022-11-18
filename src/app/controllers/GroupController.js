const sequelize = require('../config/connectDB')
const { QueryTypes } = require('sequelize');

class GroupController {
    // [GET] /api/group
    async index(req,res){
        try {
            const data = await sequelize.query(`SELECT * FROM groups 
                                                    JOIN subjects ON groups.MA_MH = subjects.MA_MH 
                                                    JOIN teachers ON groups.MA_GV = teachers.MA_GV
                                                    JOIN semesters ON groups.MA_HK = semesters.MA_HK 
                                                    JOIN years ON groups.MA_NH = years.MA_NH ORDER BY groups.MA_NHP ASC`, 
                                                { type: QueryTypes.SELECT, })
            return res.json({
                data: data,
                status: 400
            })            
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }

    // [GET] /api/group
    async getGroups(req,res){
        try {
            const MA_MH = req.params.MA_MH
            const data = await sequelize.query(`SELECT * FROM groups 
                                                    JOIN subjects ON groups.MA_MH = subjects.MA_MH 
                                                    JOIN teachers ON groups.MA_GV = teachers.MA_GV
                                                    JOIN semesters ON groups.MA_HK = semesters.MA_HK 
                                                    JOIN years ON groups.MA_NH = years.MA_NH
                                                WHERE groups.MA_MH LIKE '%${MA_MH}'
                                                ORDER BY groups.MA_NHP ASC`, 
                                                { type: QueryTypes.SELECT, })
            return res.json({
                data: data,
                message: 'SUCCESS'
            })            
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }

    //[POST] /api/group/
    async create(req,res){
        try {
            const maNHP = "ABCD"
            const maMH = req.body.MA_MH
            const maGV = req.body.MA_GV
            const maHK = req.body.MA_HK
            const maNH = req.body.MA_NH
            const soLuong = req.body.SO_LUONG
            await sequelize.query(`INSERT INTO groups (MA_NHP, MA_MH, MA_GV, MA_HK, MA_NH, SO_LUONG,SO_LUONG_CU, CON_LAI)
                                         VALUES ('${maNHP}', '${maMH}', '${maGV}', '${maHK}', '${maNH}', '${soLuong}', '${soLuong}', '${soLuong}')`,
                                    { type: QueryTypes.INSERT })
            return res.json({
                message: 'SUCCESS'
            })            
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }

    //[PUT] /api/group/:MA_NHP 
    async update(req,res){
        try {
            const maNHP = req.params.MA_NHP
            const maMH = req.body.MA_MH
            const maGV = req.body.MA_GV
            const maHK = req.body.MA_HK
            const maNH = req.body.MA_NH
            const soLuong = req.body.SO_LUONG
            const soLuongCu = req.body.SO_LUONG_CU
            let conLai = 0
            if(soLuong > soLuongCu) {conLai = req.body.CON_LAI + (soLuong - soLuongCu)}
            else conLai = req.body.CON_LAI - (soLuongCu - soLuong)
            
            if(maNHP !== "" && maMH !== "" && maGV !== "" && maHK !== "" && maNH !== "" && conLai>0){
                await sequelize.query(`UPDATE groups
                                        SET MA_MH = '${maMH}', MA_GV = '${maGV}', MA_HK = '${maHK}', MA_NH = '${maNH}', SO_LUONG = '${soLuong}', SO_LUONG_CU = '${soLuong}', CON_LAI = '${conLai}'
                                        WHERE MA_NHP LIKE '%${maNHP}'`,
                                        { type: QueryTypes.UPDATE })
    
                return res.json({
                    message: 'SUCCESS'
                })            
            }
            else{
                return res.json({
                    message: 'FAIL'
                })  
            }

        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }

    async delete(req,res){
        try {
            const maNHP = req.params.MA_NHP
            await sequelize.query(`DELETE FROM groups WHERE MA_NHP LIKE '%${maNHP}'`,
                                    { type: QueryTypes.DELETE })
            return res.json({
                message: 'SUCCESS'
            })            
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }
}

module.exports = new GroupController 