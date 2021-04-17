const express = require('express');
const Web3 = require('web3');
const ipfs = require("nano-ipfs-store").at("https://ipfs.infura.io:5001");
const MyContract = require('../build/contracts/Records.json')
var CryptoJS = require("crypto-js");

const router = express.Router();
owner = '0x485A5bbCc9b5934da6d492D9916599279a3F08C6'
const web3 = new Web3('HTTP://127.0.0.1:7545');
const deployedNetwork = MyContract.networks[5777];
const contract = web3.eth.contract(MyContract.abi, deployedNetwork.address)


router.get('/getreportspatient', async function (req, res) {
  try {
    console.log(req.query, req.query.account);
    //get the CID from blockchain
    const results = await contract.methods.get_report_records(req.query.account).call()
    //get data from ipfs
    const output = JSON.parse(await ipfs.cat(results))
    //decrypt the data
    var bytes = CryptoJS.AES.decrypt(output, 'secret key 123');
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    res.send(decryptedData)
  }
  catch (e) {
    res.send({ err: e.message })
  }



});
module.exports = router;


