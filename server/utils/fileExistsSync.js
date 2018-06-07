'use strict'
const fs = require('fs')

/* :: string -> boolean */
const fileExistsSync = (path) => {
  try {
    return fs.statSync(path).isFile()
  } catch (e) {
    return false
  }
}

module.exports = fileExistsSync
