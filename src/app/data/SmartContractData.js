const Web3 = require('web3');
const abi = require('../constracts/scores.json')

class SmartContractData {
    constructor(){
        this.web3 = new Web3('http://127.0.0.1:8545');
        this.address = "0x5BC6Cf4FCB10E07889C734Ea1876841e2A0E0478";
    }

    async connect(){
        return await new this.web3.eth.Contract(abi, this.address)
    }

    async getAccount(idx){
        this.account = await this.web3.eth.getAccounts()
        return this.account[idx]
    }

    // async getScoreToAllSV(){
    //     const contract = await this.connect()
    //     const getSV = contract.methods.getScoreAllSV().call()
    //     return getSV
    // }

    async getAllScoreToSV(maSV){
        const contract = await this.connect()
        const getSV = contract.methods.getAllScoreSV(maSV).call()
        return getSV
    }

    // async getScoreToSV(maSV, maHK, maNH){
    //     const contract = await this.connect()
    //     const getSV = contract.methods.getScoreSV(maSV, maHK, maNH).call()
    //     return getSV
    // }

    async getDiemBlockchainGV(maNHP){
        const contract = await this.connect() 
        const getSV = contract.methods.getScoreGV(maNHP).call()
        return getSV
    }

    async setDiemBlockchain(maNHP, maSV, hotenSV, maMH, tenMH, tinChi, diemSo, diemChu, lyDo){
        const contract = await this.connect()   
        contract.methods.setScoreGV(maNHP, maSV, hotenSV, maMH, tenMH, tinChi, diemSo, diemChu, lyDo).send({
            from: await this.getAccount(0),
            gas: 3000000,
        })
    }

    async editDiemBlockchain(maSV, maNHP, diemSo, diemChu, lyDo){
        const contract = await this.connect()   
        contract.methods.editScoreGV(maSV, maNHP, diemSo, diemChu, lyDo).send({
            from: await this.getAccount(0),
            gas: 3000000,
        })
    }
}


module.exports = new SmartContractData 
