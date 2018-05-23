'use strict'

/**
 @TODO: This function needs testing and can be optimised.
 */

const getTransactions = async (web3, { limit = 10 } = {}) => {
  const currBlockNumber = await web3.eth.getBlockNumber()
  const txs = []

  let blockNumber = currBlockNumber

  while (txs.length < limit) {
    const { transactions } = await web3.eth.getBlock(blockNumber, true)

    if (transactions.length > 0) {
      txs.push(transactions)
    }

    blockNumber -= 1

    if (blockNumber < 0) {
      break
    }
  }

  return txs.slice(0, limit)
}

module.exports = {
  getTransactions
}
