'use strict'
const Router = require('koa-router')
const model = require('../model/transactions')
const { web3 } = require('../config')

const router = new Router()


/**
 +----------------------------------------------------------------------------+
 | Handlers                                                                   |
 +----------------------------------------------------------------------------+*/

/* GET /api/v1/transactions */
const getTransactions = async (ctx) => {
  const { limit } = ctx.query
  const transactions = await model.getTransactions(web3, { limit })

  ctx.body = {
    status: 'OK',
    data: transactions
  }
}

/* GET /api/v1/transactions/:txhash */
const getTrasaction = async (ctx) => {
  const { txhash } = ctx.params
  const transaction = await model.getTransaction(web3, txhash)

  ctx.body = {
    status: 'OK',
    data: transaction
  }
}


/**
 +----------------------------------------------------------------------------+
 | Routes                                                                     |
 +----------------------------------------------------------------------------+*/

router.get(
  '/transactions',
  getTransactions
)

router.get(
  '/transactions/:txhash',
  getTrasaction
)

module.exports = router
