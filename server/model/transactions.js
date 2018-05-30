'use strict'
const _ = require('lodash')
const abiDecoder = require('abi-decoder')
const { prefixHex } = require('@appliedblockchain/bdash')
const { web3, getContractConfig } = require('../config')

/**
 [1]. @NOTE: web3.eth.getBlock() is returning null sometimes. This is unexpected
 behaviour which is resolved using _.get().
 */

/* :: (object, object) -> Promise<object> */
const getTransactions = async (web3, { limit = 10 } = {}) => {
  const currBlockNumber = await web3.eth.getBlockNumber()
  const txs = []

  let blockNumber = currBlockNumber

  while (txs.length < limit) {
    const block = await web3.eth.getBlock(blockNumber, true) /* [1] */
    const transactions = _.get(block, 'transactions', []) /* [1] */

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

/**
 [1]. A object with event ABI signature as keys and event ABI as value.
 [2]. Since we know that the transaction is a calling a known contract we can
 get the event name and params using the contract ABI.
 */

/* :: (object, Array<object>) -> Array<object> */
const getEventLogs = (eventsABI, logs) => {
  const eventSigs = eventsABI.reduce((sigs, eventABI) => ({ /* [1] */
    ...sigs,
    [web3.eth.abi.encodeEventSignature(eventABI)]: eventABI
  }), {})

  const addInfo = (log) => { /* [2] */
    const [ eventSig ] = log.topics
    const eventABI = eventSigs[eventSig]

    const { name } = eventABI
    const params = eventABI.inputs.length > 0
      ? web3.eth.abi.decodeLog(eventABI.inputs, log.data, log.topics)
      : null

    return { ...log, name, params }
  }

  return logs.map(addInfo)
}

/* :: string -> Promise<object> */
const getTransaction = async (txHash) => {
  const [ transaction, { logs } ] = await Promise.all([
    web3.eth.getTransaction(prefixHex(txHash)),
    web3.eth.getTransactionReceipt(prefixHex(txHash))
  ])

  transaction.logs = logs
  transaction.enhanced = false

  /** Check if the transaction is for a known contract. Return extra info if true. */
  const contractInfo = contracts[transaction.to]
  if (!_.isNil(contractInfo)) {
    abiDecoder.addABI(contractInfo.abi)
    const info = abiDecoder.decodeMethod(transaction.input)

    transaction.enhanced = true
    transaction.method = info.name
    transaction.params = info.params
    transaction.toName = contractInfo.name

    const eventsABI = contractInfo.abi.filter(({ type }) => type === 'event')
    transaction.logs = getEventLogs(eventsABI, logs)
  }

  return transaction
}

module.exports = {
  getTransactions,
  getTransaction
}
