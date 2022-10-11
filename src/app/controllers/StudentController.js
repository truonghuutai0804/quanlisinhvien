const sequelize = require('../config/connectDB')
const { QueryTypes } = require('sequelize');

class StudentController {
    // [GET] /student
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
}

module.exports = new StudentController