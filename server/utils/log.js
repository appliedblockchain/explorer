'use strict'
const { Signale } = require('signale')

/**
 👋 Hackable console logger
 https://github.com/klauscfhq/signale
 */
const log = new Signale({ scope: 'API' })

log.config({
  displayTimestamp: true
})

module.exports = log
