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

    // [GET] /api/student
    async getSVZ(req,res){
        try {
            const sort = req.query.SORT
            var data
            switch (sort) {
                case "1":
                    data = await sequelize.query(`SELECT * FROM students JOIN classes ON students.MA_LOP = classes.MA_LOP 
                                                                                JOIN provinces ON students.MA_TINH = provinces.MA_TINH 
                                                                                JOIN majors ON classes.MA_CN = majors.MA_CN 
                                                                                JOIN faculties ON majors.MA_KHOA = faculties.MA_KHOA
                                                        ORDER BY MA_SV DESC`,
                                                        { type: QueryTypes.SELECT, })
                    break;
                case "2":
                    data = await sequelize.query(`SELECT * FROM students JOIN classes ON students.MA_LOP = classes.MA_LOP 
                                                                                JOIN provinces ON students.MA_TINH = provinces.MA_TINH 
                                                                                JOIN majors ON classes.MA_CN = majors.MA_CN 
                                                                                JOIN faculties ON majors.MA_KHOA = faculties.MA_KHOA
                                                        ORDER BY HOTEN_SV ASC`,
                                                        { type: QueryTypes.SELECT, })
                    break;
                case "3":
                    data = await sequelize.query(`SELECT * FROM students JOIN classes ON students.MA_LOP = classes.MA_LOP 
                                                                                JOIN provinces ON students.MA_TINH = provinces.MA_TINH 
                                                                                JOIN majors ON classes.MA_CN = majors.MA_CN 
                                                                                JOIN faculties ON majors.MA_KHOA = faculties.MA_KHOA
                                                        ORDER BY HOTEN_SV DESC`,
                                                        { type: QueryTypes.SELECT, })
                    break;
                default:
                    data = await sequelize.query(`SELECT * FROM students JOIN classes ON students.MA_LOP = classes.MA_LOP 
                                                                                JOIN provinces ON students.MA_TINH = provinces.MA_TINH 
                                                                                JOIN majors ON classes.MA_CN = majors.MA_CN 
                                                                                JOIN faculties ON majors.MA_KHOA = faculties.MA_KHOA
                                                        ORDER BY MA_SV ASC`,
                                                        { type: QueryTypes.SELECT, })
                    break;
            }
            return res.json({
                data: data,
                status: 400
            })           
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }

    // [GET] /api/student/:id
    async getSV(req,res){
        try {
            const maSV = req.params.MA_SV
            const data = await sequelize.query(`SELECT * FROM students JOIN classes ON students.MA_LOP = classes.MA_LOP 
                                                                        JOIN provinces ON students.MA_TINH = provinces.MA_TINH
                                                                        JOIN majors ON classes.MA_CN = majors.MA_CN 
                                                                        JOIN faculties ON majors.MA_KHOA = faculties.MA_KHOA
                                                                        WHERE MA_SV LIKE '%${maSV}'`,
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
            const mailSV = req.body.EMAIL_SV
            const sdtSV = req.body.SODIENTHOAI_SV
            const tenCha = req.body.TENCHA_SV
            const tuoiCha = req.body.TUOICHA_SV
            const tenMe = req.body.TENME_SV
            const tuoiMe = req.body.TUOIME_SV
            const trangthai = 0
            const mkSV = random(8)

            await sequelize.query(`INSERT INTO students (MA_SV, MA_LOP, MA_TINH, HOTEN_SV, GIOITINH_SV, NGAYSINH_SV, EMAIL_SV, SODIENTHOAI_SV, TRANGTHAI_SV ,MATKHAU_SV, TENCHA_SV, TUOICHA_SV, TENME_SV, TUOIME_SV )
                                            VALUES ('${maSV}', '${maLop}', '${maTinh}', '${tenSV}', '${gtSV}', '${nsSV}', '${mailSV}' , '${sdtSV}', ${trangthai} , '${mkSV}', '${tenCha}', '${tuoiCha}', '${tenMe}', '${tuoiMe}')`,
                                                { type: QueryTypes.INSERT })
            return res.json({
                message: 'SUCCESS'
            })           
        } catch (error) {
            console.log('Lỗi nhá:', error)
            return res.json({
                message: 'FAIL'
            })
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
            const mailSV = req.body.EMAIL_SV
            const sdtSV = req.body.SODIENTHOAI_SV
            const tenCha = req.body.TENCHA_SV
            const tuoiCha = req.body.TUOICHA_SV
            const tenMe = req.body.TENME_SV
            const tuoiMe = req.body.TUOIME_SV

            await sequelize.query(`UPDATE students
                                    SET MA_LOP = '${maLop}', MA_TINH = '${maTinh}', HOTEN_SV = '${tenSV}', GIOITINH_SV = '${gtSV}', 
                                        NGAYSINH_SV = '${nsSV}', SODIENTHOAI_SV = '${sdtSV}', EMAIL_SV = '${mailSV}', TENCHA_SV = '${tenCha}', 
                                        TUOICHA_SV = '${tuoiCha}', TENME_SV = '${tenMe}', TUOIME_SV = '${tuoiMe}'
                                    WHERE MA_SV LIKE '%${maSV}'`,
                                    { type: QueryTypes.UPDATE })
            return res.json({
                message: 'SUCCESS'
            })           
        } catch (error) {
            console.log('Lỗi nhá:', error)
            return res.json({
                message: 'FAIL'
            })
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
            return res.json({
                message: 'FAIL'
            })
        }
    }
}

module.exports = new StudentController