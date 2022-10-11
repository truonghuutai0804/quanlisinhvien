const sequelize = require('../config/connectDB')
const { QueryTypes } = require('sequelize');

class ScoreController {
    // [GET] /score
    async index(req,res){
        try {
            const data = await sequelize.query(`SELECT tongdiem.MA_SV, tongdiem.HOTEN_SV, (SUM(tongdiem.TONG)/SUM(tongdiem.TIN_CHI)) AS TRUNG_BINH, SUM(tongdiem.TIN_CHI) AS TIN_CHI 
                                                FROM (SELECT students.MA_SV, HOTEN_SV, (TIN_CHI * DIEM_SO) AS TONG, TIN_CHI 
                                                        FROM scores JOIN groups ON scores.MA_NHP = groups.MA_NHP 
                                                                    JOIN subjects ON groups.MA_MH = subjects.MA_MH 
                                                                    JOIN students ON scores.MA_SV = students.MA_SV 
                                                        GROUP BY groups.MA_NHP, students.MA_SV) tongdiem 
                                                GROUP BY tongdiem.MA_SV;`, { type: QueryTypes.SELECT, })
            
            return res.json({
                data: data,
                status: 400
            })          
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }

    // [GET] /score/:id 
    async diemChiTiet(req,res){
        const idSV = req.params.id
        const dataDiem = await sequelize.query(`SELECT groups.MA_NHP, TEN_MH, TIN_CHI, DIEM_SO, DIEM_CHU 
                                                FROM scores JOIN groups ON scores.MA_NHP = groups.MA_NHP 
                                                            JOIN subjects ON subjects.MA_MH = groups.MA_MH
                                                            WHERE MA_SV LIKE '%${idSV}'`,
                                                { type: QueryTypes.SELECT })
        return res.json({
            data: dataDiem,
            status: 400
        })
    }
}

module.exports = new ScoreController