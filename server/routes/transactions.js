'use strict'
const express = require('express')
const { Joi, celebrate: validate } = require('celebrate')
const { prefixHex } = require('@appliedblockchain/bdash')
const model = require('../model/transactions')
const { web3 } = require('../config')
const { withError } = require('./helpers')

const router = express.Router() // eslint-disable-line new-cap


/**
 +----------------------------------------------------------------------------+
 | Handlers                                                                   |
 +----------------------------------------------------------------------------+*/

/* GET /api/v1/transactions */
const getTransactions = withError(async (request, respond) => {
  const { limit } = request.query
  const transactions = await model.getTransactions(web3, { limit })

  respond.json({
    status: 'OK',
    data: transactions
  })
})

/* GET /api/v1/transactions/:txhash */
const getTrasaction = withError(async (request, respond) => {
  const { txhash } = request.params
  const transaction = await web3.eth.getTransaction(prefixHex(txhash))

  respond.json({
    status: 'OK',
    data: transaction
  })
})


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
