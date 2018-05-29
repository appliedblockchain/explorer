'use strict'
const fs = require('fs')
const path = require('path')

const contractConfigPath = path.resolve(__dirname, '../../config.json')
const configExists = fs.existsSync(contractConfigPath)

const getContractConfig = () => configExists
  ? require(contractConfigPath)
  : {
    contracts: {}
  }

module.exports = { getContractConfig }
