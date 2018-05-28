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

export {
  getBlock,
  getTransaction
}
