const sequelize = require('../config/connectDB')
const { QueryTypes } = require('sequelize');

class SubjectController {
    // [GET] /api/subject
    async index(req,res){
        try {
            const data = await sequelize.query(`SELECT * FROM subjects JOIN faculties ON subjects.MA_KHOA = faculties.MA_KHOA `, { type: QueryTypes.SELECT, })
            return res.json({
                data: data,
                status: 400
            })            
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }

    // [GET] /api/subject/:MA_GV
    async getMonHoc(req,res){
        try {
            const maGV = req.params.MA_GV
            const data = await sequelize.query(`SELECT * FROM subjects JOIN groups ON subjects.MA_MH = groups.MA_MH WHERE MA_GV LIKE '%${maGV}' `, { type: QueryTypes.SELECT, })
            return res.json({
                data: data,
                message: 'SUCCESS'
            })            
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }

     // [GET] /api/subjects/:MA_SV
     async getDangKyHocPhan(req,res){
        try {
            const maSV = req.params.MA_SV
            const data = await sequelize.query(`SELECT * FROM subjects WHERE MA_MH NOT IN ( SELECT subjects.MA_MH FROM groups JOIN subjects ON groups.MA_MH = subjects.MA_MH JOIN scores ON groups.MA_NHP = scores.MA_NHP JOIN students ON scores.MA_SV = students.MA_SV WHERE scores.MA_SV LIKE '%${maSV}' ); `, { type: QueryTypes.SELECT, })
            return res.json({
                data: data,
                message: 'SUCCESS'
            })            
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }

    // [POST] /api/subject
    async create(req,res, next){
        try {
            const maMH = req.body.MA_MH
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
                                    SET TEN_MH = '${tenMH}', MA_KHOA = '${maKhoa}', TIN_CHI = '${tinChi}' 
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