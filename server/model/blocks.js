'use strict'
const { times, reject, isNull } = require('lodash')

/**
 Get Blocks

 [1]. Handles limit > total blocks. Blocks are zero based indexed.
 [2]. Sometimes currBlock is incorrect and .getBlock() returns null. This fixes
 that.

 @TODO: Handle blocks `offset`.
 */

const getBlocks = async (web3, {
  limit = 10,
  order = 'desc'
} = {}) => {
  const isAscending = order === 'asc'
  const currBlock = await web3.eth.getBlockNumber()
  const totalBlocks = Math.min(limit, currBlock + 1) /* [1] */

  const blocksPromise = times(totalBlocks)
    .map(idx => web3.eth.getBlock(isAscending ? idx : currBlock - idx))
  const blocks = await Promise.all(blocksPromise)

  return reject(blocks, isNull) /* [2] */
}

module.exports = {
  getBlocks
}
