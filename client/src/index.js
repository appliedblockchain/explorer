import React from 'react'
import ReactDOM from 'react-dom'

/** @TODO: '@appliedblockchain/block-explorer-client' */
import './block-explorer-client/index.scss'
import { createApp } from './block-explorer-client'

const App = createApp()

ReactDOM.render(<App />, document.getElementById('root'))
