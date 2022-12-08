const sequelize = require('../config/connectDB')
const { QueryTypes } = require('sequelize');

class ReasonController {
    async index(req, res) {
        try {
            const data = await sequelize.query(`SELECT * FROM reasons`, { type: QueryTypes.SELECT, })
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
            const maLD = req.body.MA_LD
            const lydo = req.body.LY_DO

            await sequelize.query(`INSERT INTO reasons (MA_LD, LY_DO)
                                         VALUES ('${maLD}', '${lydo}')`, { type: QueryTypes.INSERT })
            return res.json({
                message: 'SUCCESS'
            })            
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
}

async update(req,res, next){
    try {
        const maLD = req.params.MA_LD
        const lydo = req.body.LY_DO

        await sequelize.query(`UPDATE reasons 
                                SET LY_DO = '${lydo}'
                                WHERE MA_LD LIKE '%${maLD}'`, { type: QueryTypes.UPDATE })
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
        const maLD = req.params.MA_LD

        await sequelize.query(` DELETE FROM reasons WHERE MA_LD LIKE '%${maLD}'`, { type: QueryTypes.DELETE })

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

module.exports = new ReasonController 
