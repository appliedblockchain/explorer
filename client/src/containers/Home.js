import React, { Component, Fragment } from 'react'
import isNull from 'lodash/isNull'
import { Navbar, Main, HomeView } from '../components'
import * as api from '../api'

export class Home extends Component {
  state = {
    blocks: null,
    transactions: null
  }

  componentDidMount() {
    this.getData()
  }

  async getData() {
    const [
      blocks,
      transactions
    ] = await Promise.all([
      api.getLatestBlocks(),
      api.getLatestTransactions()
    ])

    this.setState({ blocks, transactions })
  }

  render() {
    const { blocks, transactions } = this.state

    if (isNull(blocks) || isNull(transactions)) {
      return <p>Loading...</p>
    }

    return (
      <Fragment>
        <Navbar />
        <Main>
          <HomeView blocks={blocks} transactions={transactions} />
        </Main>
      </Fragment>
    )
  }
}
