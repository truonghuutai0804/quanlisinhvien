const Web3 = require('web3');
const abi = require('../constracts/scores.json')

class SmartContractData {
    constructor(){
        this.web3 = new Web3('http://127.0.0.1:8545');
        this.address = "0xB6Bd5BE74Df43eeff8fE6243754b767a66c03fB2";
    }

    async connect(){
        return await new this.web3.eth.Contract(abi, this.address)
    }

    async getAccount(idx){
        this.account = await this.web3.eth.getAccounts()
        return this.account[idx]
    }

    async getScoreToSV(){
        const contract = await this.connect() 
        const getSV = contract.methods.getScoreSV("B1800002").call()
        return getSV
    }

    async getScoreToGV(){
        const contract = await this.connect() 
        const getSV = contract.methods.getScoreGV("NH00001").call()
        return getSV
    }

    async setDiemBlockchain(){
        const contract = await this.connect()   
        contract.methods.setScoreGV("NH00002", "B1800002", "Trương Hữu Tài", "CT162", "Lập trình web", "9.5", "1", "1", "21", "2021-2022").send({
            from: await this.getAccount(0),
            gas: 3000000,
        })
    }
}


module.exports = new SmartContractData 
