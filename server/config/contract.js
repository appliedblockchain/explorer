'use strict'
const fs = require('fs')
const path = require('path')

const defaultContractPath = path.resolve(__dirname, '../../config.json')
const contractConfigPath = process.env.CONFIG_FILE_PATH || defaultContractPath
const configExists = fs.existsSync(contractConfigPath)

const getContractConfig = () => configExists
  ? require(contractConfigPath)
  : {
    contracts: {},
    addressBook: {}
  }

module.exports = { getContractConfig }
