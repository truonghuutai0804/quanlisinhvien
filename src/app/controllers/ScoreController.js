const sequelize = require('../config/connectDB')
const { QueryTypes } = require('sequelize');

const chuyenDiem = (diem) =>{
    var diemChu = 'A'
    if(diem < 9.0 && diem >= 8.0) diemChu = 'B+'
    if(diem < 8.0 && diem >= 7.0) diemChu = 'B'
    if(diem < 7.0 && diem >= 6.5) diemChu = 'C+'
    if(diem < 6.5 && diem >= 5.5) diemChu = 'C'
    if(diem < 5.5 && diem >= 5.0) diemChu = 'D+'
    if(diem < 5.0 && diem >= 4.0) diemChu = 'D'
    if(diem < 4.0) diemChu = 'F'
    return diemChu
}

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
        const maSV = req.params.MA_SV
        const diemSo = 3.5
        const diemChu = chuyenDiem(diemSo)
        console.log(diemChu);
        const dataDiem = await sequelize.query(`SELECT groups.MA_NHP, TEN_MH, TIN_CHI, DIEM_SO, DIEM_CHU 
                                                FROM scores JOIN groups ON scores.MA_NHP = groups.MA_NHP 
                                                            JOIN subjects ON subjects.MA_MH = groups.MA_MH
                                                            WHERE MA_SV LIKE '%${maSV}'`,
                                                { type: QueryTypes.SELECT })
        return res.json({
            data: dataDiem,
            status: 400
        })
    }

    // [GET] /scoreSV/:id
    async getDiem(req,res){
        const maSV = req.params.MA_SV
        const maNH = req.query.MA_NH
        const maHK = req.query.MA_HK
        const dataDiem = await sequelize.query(`SELECT subjects.MA_MH, TEN_MH, TIN_CHI, DIEM_SO, DIEM_CHU 
                                                FROM scores JOIN groups ON scores.MA_NHP = groups.MA_NHP 
                                                            JOIN subjects ON groups.MA_MH = subjects.MA_MH 
                                                WHERE MA_NH LIKE '%${maNH}' AND MA_HK LIKE '%${maHK}' 
                                                                            AND MA_SV LIKE '%${maSV}'`,
                                                { type: QueryTypes.SELECT })
        return res.json({
            dataDiem,
            message: 'SUCCESS'
        })
    }

    // [POST] /api/score/
    async create(req,res, next){
        try {
            const maNHP = req.body.MA_NHP
            const maSV = req.params.MA_SV
            const diemSo = ''
            const diemChu = ''
            await sequelize.query(`INSERT INTO scores (MA_NHP, MA_SV, DIEM_SO, DIEM_CHU)
                                         VALUES ('${maNHP}', '${maSV}', '${diemSo}', '${diemChu}')`, { type: QueryTypes.INSERT })
            return res.json({
                message: 'SUCCESS'
            })            
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }

    // [PUT] /api/score/:id
    async update(req,res, next){
        try {
            const maNHP = req.params.MA_NHP
            const maSV = req.query.MA_SV
            const diemSo = req.body.DIEM_SO
            const diemChu = chuyenDiem(diemSo)
            await sequelize.query(`UPDATE scores 
                                    SET TEN_KHOA = '${diemSo}', DIEM_CHU = '${diemChu}'
                                    WHERE MA_NHP LIKE '%${maNHP}' AND MA_SV LIKE '%${maSV}'`, 
                                    { type: QueryTypes.UPDATE })
            return res.json({
                message: 'SUCCESS'
            })            
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }


}

module.exports = new ScoreController