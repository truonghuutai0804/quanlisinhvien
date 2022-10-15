const sequelize = require('../config/connectDB')
const { QueryTypes } = require('sequelize');

class YearController {
    // [GET] /api/year
    async index(req,res){
        try {
            const data = await sequelize.query(`SELECT * FROM years`, { type: QueryTypes.SELECT, })
            return res.json({
                data: data,
                status: 400
            })            
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }

    async create(req,res, next){
        const date = new Date()
        const dataMA_NH = await sequelize.query(`SELECT MA_NH FROM years ORDER BY MA_NH ASC LIMIT 1`, { type: QueryTypes.SELECT })
        var thang = date.getMonth()+1
        var nam = date.getYear()-100
        if (thang >= 8 && nam !== dataMA_NH[0].MA_NH) {
            try {
                var namhoc = date.getFullYear() +'-'+ (date.getFullYear()+1) 
                await sequelize.query(`INSERT INTO years (MA_NH, NAM_HOC)
                                             VALUES ('${nam}', '${namhoc}')`, { type: QueryTypes.INSERT })
                return res.json({
                    message: 'SUCCESS'
                })            
            } catch (error) {
                console.log('Lỗi nhá:', error)
            }
        }
    }
}

module.exports = new YearController 