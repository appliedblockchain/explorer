'use strict'
const Router = require('koa-router')
const validate = require('koa2-validation')
const Joi = require('joi')
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
  validate({
    query: Joi.object({
      limit: Joi.number().positive().integer()
    })
  }),
  getTransactions
)

router.get(
  '/transactions/:txhash',
  validate({
    params: Joi.object({
      txhash: Joi.string().hex().length(64).required()
    })
  }),
  getTrasaction
)

module.exports = router
