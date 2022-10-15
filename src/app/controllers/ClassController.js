const sequelize = require('../config/connectDB')
const { QueryTypes } = require('sequelize');

class ClassController {
    // [GET] /api/class
    async index(req,res){
        try {
            const data = await sequelize.query(`SELECT * FROM classes JOIN majors ON classes.MA_CN = majors.MA_CN `+
                                                `JOIN faculties ON majors.MA_KHOA = faculties.MA_KHOA`, 
                                                { type: QueryTypes.SELECT, })
            return res.json({
                data: data,
                status: 400
            })            
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }

    // [POST] /api/class
    async create(req,res, next){
        try {
            const maLop = req.body.MA_LOP
            const tenLop = req.body.TEN_LOP
            const maCN = req.body.MA_CN

            await sequelize.query(`INSERT INTO classes (MA_LOP,MA_CN, TEN_LOP)
                                            VALUES ('${maLop}', '${maCN}', '${tenLop}')`, { type: QueryTypes.INSERT })
            return res.json({
                message: 'SUCCESS'
            })            
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }

    // [PUT] /api/class/:id
    async update(req,res, next){
        try {
            const maLop = req.params.MA_LOP
            const tenLop = req.body.TEN_LOP
            const maCN = req.body.MA_CN

            await sequelize.query(`UPDATE classes 
                                    SET MA_CN = '${maCN}', TEN_LOP = '${tenLop}'
                                    WHERE MA_LOP LIKE '%${maLop}'`, 
                                    { type: QueryTypes.UPDATE })
            return res.json({
                message: 'SUCCESS'
            })            
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }

    // [DELETE] /api/class/:id
    async delete(req,res, next){
        try {
            const maLop = req.params.MA_LOP
            await sequelize.query(`DELETE FROM classes 
                                        WHERE MA_LOP LIKE '%${maLop}'`, 
                                    { type: QueryTypes.DELETE })
            return res.json({
                message: 'SUCCESS'
            })            
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }
}

module.exports = new ClassController 