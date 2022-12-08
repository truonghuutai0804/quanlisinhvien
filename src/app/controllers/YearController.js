const sequelize = require('../config/connectDB')
const { QueryTypes } = require('sequelize');

class YearController {
    // [GET] /api/year
    async index(req,res){
        try {
            const data = await sequelize.query(`SELECT * FROM years ORDER BY MA_NH DESC`, { type: QueryTypes.SELECT, })
            return res.json({
                data: data,
                message: 'SUCCESS'
            })            
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }

    async create(req,res, next){
            try {
                const nam = req.body.MA_NH
                const namhoc = req.body.NAM_HOC

                await sequelize.query(`INSERT INTO years (MA_NH, NAM_HOC)
                                             VALUES ('${nam}', '${namhoc}')`, { type: QueryTypes.INSERT })
                return res.json({
                    message: 'SUCCESS'
                })            
            } catch (error) {
                console.log('Lỗi nhá:', error)
            }
    }

    async update(req,res, next){
        try {
            console.log(req.body)
            const nam = req.params.MA_NH
            const namhoc = req.body.NAM_HOC

            await sequelize.query(`UPDATE years 
                                    SET NAM_HOC = '${namhoc}'
                                    WHERE MA_NH LIKE '%${nam}'`, { type: QueryTypes.UPDATE })
            return res.json({
                message: 'SUCCESS'
            })            
        } catch (error) {
            return res.json({
                message: 'FAIL',
                err: error
            }) 
        }
     
    }

    async delete(req,res, next){
        try {
            const nam = req.params.MA_NH

            await sequelize.query(` DELETE FROM years WHERE MA_NH LIKE '%${nam}'`, { type: QueryTypes.DELETE })

            return res.json({
                message: 'SUCCESS'
            })           
        } catch (error) {
            return res.json({
                message: 'FAIL',
                err: error
            }) 
        }
    }
}

module.exports = new YearController 