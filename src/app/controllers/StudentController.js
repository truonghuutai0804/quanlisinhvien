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

class StudentController {
    // [GET] /api/student
    async index(req,res){
        try {
            const data = await sequelize.query(`SELECT * FROM students JOIN classes ON students.MA_LOP = classes.MA_LOP `+
                                                                        `JOIN provinces ON students.MA_TINH = provinces.MA_TINH `+
                                                                        `JOIN majors ON classes.MA_CN = majors.MA_CN `+
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

    //[POST] /api/student
    async create(req,res){
        try {
            const maSV = req.body.MA_SV
            const maLop = req.body.MA_LOP
            const maTinh = req.body.MA_TINH
            const tenSV = req.body.HOTEN_SV
            const gtSV = req.body.GIOITINH_SV
            const nsSV = req.body.NGAYSINH_SV
            const sdtSV = req.body.SODIENTHOAI_SV
            const mkSV = random(8)

            await sequelize.query(`INSERT INTO students (MA_SV, MA_LOP, MA_TINH, HOTEN_SV, GIOITINH_SV, NGAYSINH_SV, SODIENTHOAI_SV. MATKHAU_SV )
                                            VALUES ('${maSV}', '${maLop}', '${maTinh}', '${tenSV}', '${gtSV}', '${nsSV}', '${sdtSV}', '${mkSV}')`,
                                                { type: QueryTypes.INSERT })
            return res.json({
                message: 'SUCCESS'
            })           
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }

    async update(req,res){
        try {
            const maSV = req.params.MA_SV
            const maLop = req.body.MA_LOP
            const maTinh = req.body.MA_TINH
            const tenSV = req.body.HOTEN_SV
            const gtSV = req.body.GIOITINH_SV
            const nsSV = req.body.NGAYSINH_SV
            const sdtSV = req.body.SODIENTHOAI_SV

            await sequelize.query(`UPDATE students
                                                SET MA_LOP = '${maLop}', MA_TINH = '${maTinh}', HOTEN_SV = '${tenSV}', GIOITINH_SV = '${gtSV}', 
                                                    NGAYSINH_SV = '${nsSV}', SODIENTHOAI_SV = '${sdtSV}' 
                                                WHERE MA_SV LIKE '%${maSV}'`,
                                                { type: QueryTypes.UPDATE })
            return res.json({
                message: 'SUCCESS'
            })           
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }

    async delete(req,res){
        try {
            const maSV = req.params.MA_SV
            
            await sequelize.query(`DELETE FROM students 
                                        WHERE MA_SV LIKE'${maSV}'`,
                                    { type: QueryTypes.DELETE })
            return res.json({
                message: 'SUCCESS'
            })           
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }
}

module.exports = new StudentController