import React from 'react'
import ReactDOM from 'react-dom'
import { createApp } from '@appliedblockchain/block-explorer-client'
import '@appliedblockchain/block-explorer-client/index.scss'

const App = createApp()

ReactDOM.render(<App />, document.getElementById('root'))
