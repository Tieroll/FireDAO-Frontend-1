import Web3 from "web3";
let curProvider = null
const getWeb3 = async (provider) => {
    return new Promise(function (resolve, reject) {
        try {
            if (provider) {
                curProvider = provider
            } else if (window.ethereum) {
                let web3 = new Web3(window.ethereum)
                curProvider = window.ethereum
                resolve({
                    web3,
                    account: curProvider.accounts && curProvider.accounts.length > 0 ? curProvider.accounts[0] : null
                })
            } else {
                reject(new Error("Unable to Connect"))
                alert("Unable to Connect")
            }
        } catch (e) {
            console.log(e)
            alert(e)
        }
    })
}

export default getWeb3
