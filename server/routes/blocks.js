'use strict'
const Router = require('koa-router')
const { web3 } = require('../config')
const { getBlocks: $getBlocks } = require('../model/blocks')

const router = new Router()


/**
 +----------------------------------------------------------------------------+
 | Handlers                                                                   |
 +----------------------------------------------------------------------------+*/

/* GET /api/v1/blocks */
const getBlocks = async (ctx) => {
  const { order, limit, offset } = ctx.query
  const blocks = await $getBlocks(web3, { order, limit, offset })

  ctx.body = {
    status: 'OK',
    data: blocks
  }
}

/* GET /api/v1/blocks/:number */
const getBlock = async (ctx) => {
  const blockNumber = parseInt(ctx.params.number, 10)
  const block = await web3.eth.getBlock(blockNumber)

  ctx.body = {
    status: 'OK',
    data: block
  }
}


/**
 +----------------------------------------------------------------------------+
 | Routes                                                                     |
 +----------------------------------------------------------------------------+*/

router.get(
  '/blocks',
  getBlocks
)

router.get(
  '/blocks/:number',
  getBlock
)

module.exports = router
