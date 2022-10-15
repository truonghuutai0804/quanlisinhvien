const sequelize = require('../config/connectDB')
const { QueryTypes } = require('sequelize');

class MajorController {
    // [GET] /api/major
    async index(req,res){
        try {
            const data = await sequelize.query('SELECT * FROM majors JOIN faculties ON majors.MA_KHOA = faculties.MA_KHOA', { type: QueryTypes.SELECT, })
            return res.json({
                data: data,
                status: 400
            })          
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }

    // [POST] /api/major
    async create(req,res){
        try {
            const maCN = req.body.MA_CN
            const tenCN = req.body.TEN_CN
            const maKhoa = req.body.MA_KHOA

            await sequelize.query(`INSERT INTO majors (MA_CN, MA_KHOA, TEN_CN)
                                        VALUES ('${maCN}', '${maKhoa}', '${tenCN}')`, { type: QueryTypes.INSERT })
            return res.json({
                message: 'SUCCESS'
            })          
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }

    // [PUT] /api/major/:id
    async update(req,res){
        try {
            const maCN = req.params.MA_CN
            const tenCN = req.body.TEN_CN
            const maKhoa = req.body.MA_KHOA

            await sequelize.query(`UPDATE majors 
                                    SET MA_KHOA = '${maKhoa}', TEN_CN = '${tenCN}'
                                    WHERE MA_CN LIKE '%${maCN}'`, { type: QueryTypes.UPDATE })
            return res.json({
                message: 'SUCCESS'
            })          
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }

    // [DELETE] /api/major/:id
    async delete(req,res){
        try {
            const maCN = req.params.MA_CN

            await sequelize.query(`DELETE FROM majors 
                                        WHERE MA_CN LIKE '%${maCN}'`, { type: QueryTypes.DELETE })
            return res.json({
                message: 'SUCCESS'
            })          
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }
}

module.exports = new MajorController