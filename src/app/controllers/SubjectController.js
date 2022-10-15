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

    // [POST] /api/subject
    async create(req,res, next){
        try {
            const maMH = req.params.MA_MH
            const tenMH = req.body.TEN_MH
            const maKhoa = req.body.MA_KHOA
            const tinChi = req.body.TIN_CHI

            await sequelize.query(`INSERT INTO subjects (MA_MH, TEN_MH, MA_KHOA, TIN_CHI)
                                         VALUES ('${maMH}', '${tenMH}', '${maKhoa}', '${tinChi}')`, { type: QueryTypes.INSERT })
            return res.json({
                message: 'SUCCESS'
            })            
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }

    // [PUT] /api/subject/:id
    async update(req,res, next){
        try {
            const maMH = req.params.MA_MH
            const tenMH = req.body.TEN_MH
            const maKhoa = req.body.MA_KHOA
            const tinChi = req.body.TIN_CHI

            await sequelize.query(`UPDATE subjects 
                                    SET TEN_MH = '${tenMH}', TEN_KHOA = '${maKhoa}', TIN_CHI = '${tinChi}' 
                                    WHERE MA_MH LIKE '%${maMH}'`, 
                                    { type: QueryTypes.UPDATE })
            return res.json({
                message: 'SUCCESS'
            })            
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }

    // [DELETE] /api/subject/:id
    async delete(req,res, next){
        try {
            const maMH = req.params.MA_MH
            await sequelize.query(`DELETE FROM subjects 
                                        WHERE MA_MH LIKE '%${maMH}'`, 
                                    { type: QueryTypes.DELETE })
            return res.json({
                message: 'SUCCESS'
            })            
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }

}

module.exports = new SubjectController 