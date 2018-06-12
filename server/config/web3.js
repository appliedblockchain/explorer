'use strict'
const Web3 = require('web3')
const { isDevelopment } = require('./env')

const url = isDevelopment()
  ? 'http://localhost:8546'
  : process.env.ETHEREUM_JSONRPC_ENDPOINT
const provider = new Web3.providers.HttpProvider(url)
const web3 = new Web3(provider)

module.exports = { web3 }
