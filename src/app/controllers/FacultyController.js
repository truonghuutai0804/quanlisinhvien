const sequelize = require('../config/connectDB')
const { QueryTypes } = require('sequelize');

class FacultyController {
    // [GET] /api/faculty
    async index(req,res, next){
        try {
            const data = await sequelize.query(`SELECT * FROM faculties`, { type: QueryTypes.SELECT })
            return res.json({
                data: data,
                status: 400
            })            
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }

    // [POST] /api/faculty
    async create(req,res, next){
        try {
            const maKhoa = req.body.MA_KHOA
            const tenKhoa = req.body.TEN_KHOA
            await sequelize.query(`INSERT INTO faculties (MA_KHOA, TEN_KHOA)
                                         VALUES ('${maKhoa}', '${tenKhoa}')`, { type: QueryTypes.INSERT })
            return res.json({
                message: 'SUCCESS'
            })            
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }

    // [PUT] /api/faculty/:id
    async update(req,res, next){
        try {
            const maKhoa = req.params.MA_KHOA
            const tenKhoa = req.body.TEN_KHOA
            console.log(req.body)
            await sequelize.query(`UPDATE faculties 
                                    SET TEN_KHOA = '${tenKhoa}' 
                                    WHERE MA_KHOA LIKE '%${maKhoa}'`, 
                                    { type: QueryTypes.UPDATE })
            return res.json({
                message: 'SUCCESS'
            })            
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }

    // [DELETE] /api/faculty/:id
    async delete(req,res, next){
        try {
            const maKhoa = req.params.MA_KHOA
            await sequelize.query(`DELETE FROM faculties 
                                        WHERE MA_KHOA LIKE '%${maKhoa}'`, 
                                    { type: QueryTypes.DELETE })
            return res.json({
                message: 'SUCCESS'
            })            
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }
}

module.exports = new FacultyController 