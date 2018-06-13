'use strict'
const { get, isNil, pickBy, first } = require('lodash')
const abiDecoder = require('abi-decoder')
const { prefixHex } = require('@appliedblockchain/bdash')
const { web3, getProjectConfig } = require('../config')

/**
 [1]. @NOTE: web3.eth.getBlock() is returning null sometimes. This is unexpected
 behaviour which is resolved using get().
 */

/* :: (object, object) -> Promise<object> */
const getTransactions = async (web3, { limit = 10 } = {}) => {
  const currBlockNumber = await web3.eth.getBlockNumber()
  const txs = []

  let blockNumber = currBlockNumber

  while (txs.length < limit) {
    const block = await web3.eth.getBlock(blockNumber, true) /* [1] */
    const transactions = get(block, 'transactions', []) /* [1] */

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



/* :: (object[], string, string[]) -> object[] */
const getEventParams = (inputs, data, topics) => {
  const decodedParams = web3.eth.abi.decodeLog(inputs, data, topics.slice(1))
  const params = inputs.map((input, idx) => ({
    ...input,
    value: decodedParams[idx]
  }))

  return params
}

/**
 [1]. Since we know that the transaction is a calling a known contract we can
 get the event name and params using the contract ABI.
 */

/* :: (object, Array<object>) -> Array<object> */
const getEventLogs = (eventSigs, logs) => {
  const addInfo = (log) => { /* [1] */
    const [ eventSig ] = log.topics
    const eventABI = eventSigs[eventSig]

    const { name } = eventABI
    const params = eventABI.inputs.length > 0
      ? getEventParams(eventABI.inputs, log.data, log.topics)
      : null

    return { ...log, name, params }
  }

  return logs.map(addInfo)
}

/** [1]. Given a contracts ABI return { [eventSig]: eventABI } */

/* :: object[] -> object */
const getEventSigs = contractABI => contractABI
  .filter(({ type }) => type === 'event')
  .reduce((sigs, eventABI) => ({ /* [1] */
    ...sigs,
    [web3.eth.abi.encodeEventSignature(eventABI)]: eventABI
  }), {})

/* :: string -> ?object */
const getContractInfo = (contracts, address) => {
  const hasAddress = ({ deployments = [] }) =>
    deployments.some(deployment => address === deployment.address)
  const contract = pickBy(contracts, hasAddress)

  return first(Object.values(contract))
}

/* :: (object, string) -> Promise<object> */
const getTransaction = async (web3, txHash) => {
  const [ transaction, { logs } ] = await Promise.all([
    web3.eth.getTransaction(prefixHex(txHash)),
    web3.eth.getTransactionReceipt(prefixHex(txHash))
  ])

  transaction.logs = logs
  transaction.enhanced = false

  /** Check if the transaction is for a known contract. Return extra info if true. */
  const { contracts } = await getProjectConfig()
  const contractInfo = getContractInfo(contracts, transaction.to)
  if (!isNil(contractInfo)) {
    abiDecoder.addABI(contractInfo.abi)
    const info = abiDecoder.decodeMethod(transaction.input)

    transaction.enhanced = true
    transaction.method = info.name
    transaction.params = info.params
    transaction.toName = contractInfo.name

    const eventsSigs = getEventSigs(contractInfo.abi)
    transaction.logs = getEventLogs(eventsSigs, logs)
  }

  return transaction
}

module.exports = {
  getEventParams,
  getEventSigs,
  getEventLogs,
  getTransactions,
  getTransaction
}
