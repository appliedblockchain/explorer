import { times } from 'lodash'

/**
 Get Blocks

 [1]. Handles limit > total blocks. Blocks are zero based indexed.

 @TODO: Handle blocks `offset`.
 */

export const getBlocks = async (web3, {
  limit = 10,
  order = 'desc'
} = {}) => {
  const isAscending = order === 'asc'
  const currBlock = await web3.eth.getBlockNumber()
  const totalBlocks = Math.min(limit, currBlock + 1) /* [1] */

  const blocksPromise = times(totalBlocks)
    .map(idx => web3.eth.getBlock(isAscending ? idx : currBlock - idx))
  const blocks = await Promise.all(blocksPromise)

  return blocks
}
