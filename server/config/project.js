'use strict'
const path = require('path')
const fs = require('fs-extra')
const { fileExistsSync } = require('../utils')

/** @NOTE: By default we assume there is a project config file at root */
const defaultConfigPath = path.resolve(__dirname, '../../config.json')
const projectConfigPath = process.env.CONFIG_FILE_PATH || defaultConfigPath

/* :: () -> Promise<object> */
const getProjectConfig = async () => {
  if (!fileExistsSync(projectConfigPath)) {
    return {
      addressBook: {},
      contracts: {}
    }
  }

  const config = await fs.readJson(projectConfigPath)
  return config
}

module.exports = { getProjectConfig }
