'use strict'
const path = require('path')
const { fileExistsSync } = require('../utils')

/** @NOTE: By default we assume there is a project config file at root */
const defaultConfigPath = path.resolve(__dirname, '../../config.json')
const projectConfigPath = process.env.CONFIG_FILE_PATH || defaultConfigPath

const { contracts, addressBook } = fileExistsSync(projectConfigPath)
  ? require(projectConfigPath)
  : {
    addressBook: {},
    contracts: {}
  }

module.exports = { contracts, addressBook }
