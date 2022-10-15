const sequelize = require('../config/connectDB')
const { QueryTypes } = require('sequelize');

const random = (length) =>{
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

class TeacherController {
    // [GET] /api/teacher
    async teacher(req,res){
        try {
            const dataGV = await sequelize.query(`SELECT * FROM teachers JOIN levels ON teachers.MA_CD = levels.MA_CD `+
                                                `JOIN provinces ON teachers.MA_TINH = provinces.MA_TINH `+
                                                `WHERE teachers.MA_CD LIKE '02'`, { type: QueryTypes.SELECT, })
            return res.json({
                dataGV,
                status: 400
            })
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }

    //[GET] /api/trainer
    async trainer(req,res){
        try {
            const dataPDT = await sequelize.query(`SELECT * FROM teachers JOIN levels ON teachers.MA_CD = levels.MA_CD `+
                                                `JOIN provinces ON teachers.MA_TINH = provinces.MA_TINH `+
                                                `WHERE teachers.MA_CD LIKE '03'`, { type: QueryTypes.SELECT, })
            return res.status(200).json({
                dataPDT,
                status: 400
            })
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }

    // [POST] /api/trainteacher
    async create(req,res){
        const maGV = req.body.MA_GV
        const maCD = '02'
        const maTinh = req.body.MA_TINH
        const tenGV = req.body.HOTEN_GV
        const gtGV = req.body.GIOITINH_GV
        const nsGV = req.body.NGAYSINH_GV
        const sdtGV = req.body.SODIENTHOAI_GV
        const mkGV = random(8)

        try {
            await sequelize.query(`INSERT INTO teachers (MA_GV, MA_CD, MA_TINH, HOTEN_GV, GIOITINH_GV, NGAYSINH_GV, SODIENTHOAI_GV, MATKHAU_GV)
                                    VALUES ('${maGV}', '${maCD}', '${maTinh}', '${tenGV}', '${gtGV}', '${nsGV}', '${sdtGV}', '${mkGV}')`, { type: QueryTypes.INSERT })
            return res.json({
                message: 'SUCCESS'
            })
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }

    // [PUT] /api/trainteacher/:id
    async update(req,res){
        try {
            const maGV = req.params.MA_GV
            const maCD = req.body.MA_CD
            const maTinh = req.body.MA_TINH
            const tenGV = req.body.HOTEN_GV
            const gtGV = req.body.GIOITINH_GV
            const nsGV = req.body.NGAYSINH_GV
            const sdtGV = req.body.SODIENTHOAI_GV

            await sequelize.query(`UPDATE teachers 
                                    SET MA_CD = '${maCD}', MA_TINH = '${maTinh}', HOTEN_GV = '${tenGV}', GIOITINH_GV = '${gtGV}', 
                                        NGAYSINH_GV = '${nsGV}', SODIENTHOAI_GV = '${sdtGV}' 
                                    WHERE MA_GV LIKE '%${maGV}'`, { type: QueryTypes.UPDATE, })
            return res.json({
                message: 'SUCCESS'
            })
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }

    // [DELETE] /api/trainteacher/:id
    async delete(req,res){
        try {
            const maGV = req.params.MA_GV
            await sequelize.query(`DELETE FROM teachers 
                                    WHERE MA_GV LIKE'${maGV}'`, { type: QueryTypes.DELETE })
            return res.json({
                message: 'SUCCESS'
            })
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }

    
}

module.exports = new TeacherController