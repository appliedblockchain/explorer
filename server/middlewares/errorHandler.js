'use strict'
const http = require('http')
const { isDevelopment } = require('../config')
const { log } = require('../utils')

const errorHandler = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (isDevelopment()) {
      log.error(err)
    }

    ctx.status = err.status || 500
    ctx.body = {
      status: http.STATUS_CODES[ctx.status],
      statusCode: ctx.status,
      error: err.message
    }

    ctx.app.emit('error', err, ctx)
  }
}

module.exports = errorHandler
