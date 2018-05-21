import Web3 from 'web3'

/** @TODO: Consume from config or ENV variable */
const provider = new Web3.providers.HttpProvider('https://rinkeby.infura.io/RE5yuTqXCfgmv4Z0xFLu')
const web3 = new Web3(provider)

export { web3 }
