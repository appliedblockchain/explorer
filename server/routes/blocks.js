'use strict'
const express = require('express')
const { Joi, celebrate: validate } = require('celebrate')
const { web3 } = require('../config')
const { withError } = require('./helpers')
const { getBlocks: $getBlocks } = require('../model/blocks')

const router = express.Router() // eslint-disable-line new-cap


/**
 +----------------------------------------------------------------------------+
 | Handlers                                                                   |
 +----------------------------------------------------------------------------+*/

/* GET /api/v1/blocks */
const getBlocks = withError(async (request, respond) => {
  const { order, limit, offset } = request.query
  const blocks = await $getBlocks(web3, { order, limit, offset })

  respond.json({
    status: 'OK',
    data: blocks
  })
})

/* GET /api/v1/blocks/:number */
const getBlock = withError(async (request, respond) => {
  const blockNumber = parseInt(request.params.number, 10)
  const block = await web3.eth.getBlock(blockNumber)

  respond.json({
    status: 'OK',
    data: block
  })
})


/**
 +----------------------------------------------------------------------------+
 | Routes                                                                     |
 +----------------------------------------------------------------------------+*/

router.get(
  '/blocks',
  validate({
    query: Joi.object({
      limit: Joi.number().positive().integer(),
      offset: Joi.number().integer(),
      order: Joi.string().only('asc', 'desc')
    })
  }),
  getBlocks
)

router.get(
  '/blocks/:number',
  validate({
    params: Joi.object({
      number: Joi.number().integer().required()
    })
  }),
  getBlock
)

module.exports = router
