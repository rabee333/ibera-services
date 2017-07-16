'use strict';
var nconf = require('nconf'),
    Web3 = require('web3'),
    web3 = new Web3(),
    sha256 = require('sha256'),
    key = require('./key.js'),
    promisify = require("promisify-node");

nconf.argv()
   .env()
   .file({ file: 'config.json' });

const userId = "un-authenticated";

const gethRpcEndpoint = nconf.get('geth_rpc_endpoint');
const contractAddress = nconf.get('deployed_contract_address');
const account = nconf.get('account_address');
const proofAbi = [ { "constant": true, "inputs": [ { "name": "trackingId", "type": "string" } ], "name": "getPreviousTrackingId", "outputs": [ { "name": "previousTrackingId", "type": "string" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "trackingId", "type": "string" } ], "name": "getEncryptedProof", "outputs": [ { "name": "encryptedProof", "type": "string" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "trackingId", "type": "string" } ], "name": "getOwner", "outputs": [ { "name": "owner", "type": "address" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "trackingId", "type": "string" }, { "name": "encryptedProof", "type": "string" }, { "name": "publicProof", "type": "string" } ], "name": "startTracking", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "trackingId", "type": "string" }, { "name": "previousTrackingId", "type": "string" }, { "name": "encryptedProof", "type": "string" }, { "name": "publicProof", "type": "string" } ], "name": "storeProof", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "trackingId", "type": "string" } ], "name": "getProof", "outputs": [ { "name": "owner", "type": "address" }, { "name": "encryptedProof", "type": "string" }, { "name": "publicProof", "type": "string" }, { "name": "previousTrackingId", "type": "string" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "trackingId", "type": "string" } ], "name": "getPublicProof", "outputs": [ { "name": "publicProof", "type": "string" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "trackingId", "type": "string" }, { "name": "newOwner", "type": "address" } ], "name": "transfer", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "type": "function" }, { "inputs": [], "payable": false, "type": "constructor" } ];
web3.setProvider(new Web3.providers.HttpProvider(gethRpcEndpoint));
var contractInstance = web3.eth.contract(proofAbi).at(contractAddress);

/*
[].forEach(fname => {

  exports[fname] = function

});
*/

module.exports = {
  getProof: function(trackingId) {
    return new Promise((resolve, reject) => {
      return contractInstance.getProof.call(trackingId, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  }
}
