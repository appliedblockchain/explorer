'use strict'
const Router = require('koa-router')
const blocks = require('./blocks')
const transactions = require('./transaction')

/** Routes */
const api = new Router({ prefix: '/api/v1' })

api
  .use(blocks.routes())
  .use(transactions.routes())

module.exports = api
