import axios from 'axios'

/* :: number -> Promise<object> */
const getBlock = async (blockNumber) => {
  const response = await axios.get(`/api/v1/blocks/${blockNumber}`)
  const { data: block } = response.data

  return block
}

/* :: string -> Promise<object> */
const getTransaction = async (txHash) => {
  const response = await axios.get(`/api/v1/transactions/${txHash}`)
  const { data: transaction } = response.data

  return transaction
}

/* :: number -> Promise<object> */
const getLatestBlocks = async (limit = 10) => {
  const response = await axios.get(`/api/v1/blocks?limit=${limit}`)
  const { data: blocks } = response.data

  return blocks
}

/* :: number -> Promise<object> */
const getLatestTransactions = async (limit = 10) => {
  const response = await axios.get(`/api/v1/transactions?limit=${limit}`)
  const { data: transactions } = response.data

  return transactions
}

export {
  getBlock,
  getTransaction,
  getLatestBlocks,
  getLatestTransactions
}
