'use strict'
const isNil = require('lodash/isNil')
const abiDecoder = require('abi-decoder')
const { prefixHex } = require('@appliedblockchain/bdash')
const { web3, getContractConfig } = require('../config')

const getTransactions = async (web3, { limit = 10 } = {}) => {
  const currBlockNumber = await web3.eth.getBlockNumber()
  const txs = []

  let blockNumber = currBlockNumber

  while (txs.length < limit) {
    const { transactions } = await web3.eth.getBlock(blockNumber, true)

    if (transactions.length > 0) {
      txs.push(...transactions)
    }

    blockNumber -= 1

    if (blockNumber < 0) {
      break
    }
  }

  return txs.slice(0, limit)
}


const { contracts } = getContractConfig()

/* :: string -> Promise<object> */
const getTransaction = async (txhash) => {
  const [ transaction, { logs } ] = await Promise.all([
    web3.eth.getTransaction(prefixHex(txhash)),
    web3.eth.getTransactionReceipt(prefixHex(txhash))
  ])

  transaction.logs = logs
  transaction.enhanced = false

  /** Check if the transaction is for a known contract. Return extra info if true. */
  const contractInfo = contracts[transaction.to]
  if (!isNil(contractInfo)) {
    abiDecoder.addABI(contractInfo.abi)
    const info = abiDecoder.decodeMethod(transaction.input)

    transaction.enhanced = true
    transaction.method = info.name
    transaction.params = info.params
  }

  return transaction
}

module.exports = {
  getTransactions,
  getTransaction
}
