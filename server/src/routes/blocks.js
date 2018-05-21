import express from 'express'
import { Joi, celebrate as validate } from 'celebrate'
import { web3 } from '../config'
import { withError } from './helpers'
import { getBlocks as $getBlocks } from '../model'

/* eslint-disable-next-line new-cap */
const router = express.Router()


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

export default router
