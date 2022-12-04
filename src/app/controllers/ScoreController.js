const sequelize = require('../config/connectDB')
const { QueryTypes } = require('sequelize');
const SmartContractData = require('../data/SmartContractData')

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

    // [GET] /scores/:id 
    async getTongDiemSV(req,res){
        const maSV = req.params.MA_SV

        const data = await sequelize.query(`SELECT * FROM scores 
                                                JOIN groups ON scores.MA_NHP = groups.MA_NHP
                                                JOIN subjects ON subjects.MA_MH = groups.MA_MH
                                            WHERE MA_SV LIKE '%${maSV}'`,
                                            { type: QueryTypes.SELECT })
    return res.json({
            data: data,
            message: 'SUCCESS'
        })
    }

    // [GET] /score/:id 
    async diemChiTiet(req,res){
        const maSV = req.params.MA_SV
        const maHK = req.query.MA_HK
        const maNH = req.query.MA_NH

        const dataDiem = await sequelize.query(`SELECT * FROM scores 
                                                    JOIN groups ON scores.MA_NHP = groups.MA_NHP 
                                                    JOIN subjects ON subjects.MA_MH = groups.MA_MH
                                                WHERE MA_SV LIKE '%${maSV}' AND MA_HK = '${maHK}' AND MA_NH = '${maNH}'`,
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

    // [GET] /scoreGV/:id 
    async getDiemGV(req,res){
        const maGV = req.params.MA_GV
        const maNHP = req.query.MA_NHP
        const dataDiem = await sequelize.query(`SELECT groups.MA_NHP, students.MA_SV, HOTEN_SV, subjects.MA_MH, DIEM_SO, DIEM_CHU, TEN_MH, MA_HK, MA_NH, TIN_CHI
                                                FROM scores JOIN groups ON scores.MA_NHP = groups.MA_NHP 
                                                    JOIN subjects ON groups.MA_MH = subjects.MA_MH 
                                                    JOIN students ON scores.MA_SV = students.MA_SV 
                                                WHERE   groups.MA_NHP LIKE '%${maNHP}' AND MA_GV LIKE '%${maGV}'`,
                                                { type: QueryTypes.SELECT })
        return res.json({
            dataDiem,
            message: 'SUCCESS'
        })
    }

    // [GET] /scoreAllSV/
    async getDiemBlockchainAllSV (req, res){
        try {
            let getScoreSV = await SmartContractData.getScoreToAllSV()
            return res.json({
                data:  getScoreSV,
                message: 'SUCCESS',
            })
        } catch (error) {
            console.log(error)
        }
    }

    // [GET] /allScoreSV/:MA_SV
    async getAllDiemBlockchainSV (req, res){
        const MA_SV = req.params.MA_SV
        try {
            let getScoreSV = await SmartContractData.getAllScoreToSV(MA_SV)
            return res.json({
                data:  getScoreSV,
                message: 'SUCCESS',
            })
        } catch (error) {
            console.log(error)
        }
    }

    // [GET] /scoreSV/:MA_SV
    async getDiemBlockchainSV (req, res){
        const MA_SV = req.params.MA_SV
        const MA_HK = req.query.MA_HK
        const MA_NH = req.query.MA_NH
        try {
            let getScoreSV = await SmartContractData.getScoreToSV(MA_SV, MA_HK, MA_NH)
            return res.json({
                data:  getScoreSV,
                message: 'SUCCESS',
            })
        } catch (error) {
            console.log(error)
        }
    }

    // [GET] /api/scoreGV/Blockchain/:MA_NHP
    async getDiemBlockchainGV (req, res){
        try {
            const MA_NHP = req.params.MA_NHP
            let getScoreSV = await SmartContractData.getDiemBlockchainGV(MA_NHP)
            return res.json({
                data:  getScoreSV,
                message: 'SUCCESS',
            })
        } catch (error) {
            console.log(error)
        }
    }

    // [POST] /api/scoreGV/:MA_NHP
    async setDiemBlockchain (req, res){
        const MA_NHP = req.body.MA_NHP
        const MA_SV = req.body.MA_SV
        const HOTEN_SV = req.body.HOTEN_SV
        const MA_MH = req.body.MA_MH
        const TEN_MH = req.body.TEN_MH
        const TIN_CHI = req.body.TIN_CHI
        const DIEM_SO = req.body.DIEM_SO
        const DIEM_CHU = chuyenDiem(DIEM_SO)
        const MA_HK = req.body.MA_HK
        const MA_NH = req.body.MA_NH
        if(DIEM_SO > 0 && DIEM_SO <= 10){
            try {
                await SmartContractData.setDiemBlockchain(MA_NHP, MA_SV, HOTEN_SV, MA_MH, TEN_MH, TIN_CHI, DIEM_SO, DIEM_CHU, MA_HK, MA_NH)
                
                await sequelize.query(`UPDATE scores 
                                        SET DIEM_SO = '${DIEM_SO}', DIEM_CHU = '${DIEM_CHU}'
                                        WHERE MA_NHP LIKE '%${MA_NHP}' AND MA_SV LIKE '%${MA_SV}'`, 
                                 { type: QueryTypes.UPDATE })

                return res.json({
                    message: 'SUCCESS',
                })
            } catch (error) {
                return res.json({
                    message: 'FAIL',
                    err: error
                })
            }
        }else{
            return res.json({
                message: 'FAIL',
            })
        }
    }

    // [PUT] /api/scoreAD/
    async editDiemBlockchain (req, res){
        const MA_NHP = req.body[1]
        const MA_SV = req.params.MA_SV
        const DIEM_SO = req.body[7]
        const DIEM_CHU = chuyenDiem(DIEM_SO)
        if(DIEM_SO > 0 && DIEM_SO <= 10){
            try {
                await SmartContractData.editDiemBlockchain(MA_SV, MA_NHP, DIEM_SO, DIEM_CHU)
                await sequelize.query(`UPDATE scores 
                                        SET DIEM_SO = '${DIEM_SO}', DIEM_CHU = '${DIEM_CHU}'
                                        WHERE MA_NHP LIKE '%${MA_NHP}' AND MA_SV LIKE '%${MA_SV}'`, 
                                 { type: QueryTypes.UPDATE })
                return res.json({
                    message: 'SUCCESS',
                })
            } catch (error) {
                return res.json({
                    message: 'FAIL',
                    err: error
                })
            }
        }else{
            return res.json({
                message: 'FAIL',
            })
        }
    }

    // [POST] /api/score/:MA_SV
    async create(req,res, next){
        try {
            const maNHP = req.body.MA_NHP
            const maSV = req.params.MA_SV
            await sequelize.query(` UPDATE groups SET CON_LAI = CON_LAI - 1 WHERE MA_NHP = ${maNHP}`, { type: QueryTypes.UPDATE })

            await sequelize.query(`INSERT INTO scores (MA_NHP, MA_SV)
                                         VALUES ('${maNHP}', '${maSV}')`, { type: QueryTypes.INSERT })
            

            return res.json({
                message: 'SUCCESS'
            })            
        } catch (error) {
            return res.json({
                message: 'FAIL'
            }) 
        }
    }

    // [PUT] /api/score/:MA_NHP
    async update(req,res, next){
        try {
            console.log(req.body);
            // const maNHP = req.params.MA_NHP
            // const maSV = req.query.MA_SV
            // const diemSo = req.body.DIEM_SO
            // const diemChu = chuyenDiem(diemSo)
            // await sequelize.query(`UPDATE scores 
            //                         SET DIEM_SO = '${diemSo}', DIEM_CHU = '${diemChu}'
            //                         WHERE MA_NHP LIKE '%${maNHP}' AND MA_SV LIKE '%${maSV}'`, 
            //                         { type: QueryTypes.UPDATE })
            // return res.json({
            //     message: 'SUCCESS'
            // })            
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }


}

module.exports = new ScoreController