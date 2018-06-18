import React, { Component, Fragment } from 'react'
import isNull from 'lodash/isNull'
import { Navbar, Main, Loading } from '../components'
import * as api from '../api'

/* :: Function -> Function */
export const createHome = HomeView => class Home extends Component {
  state = {
    blocks: null,
    transactions: null
  }

  componentDidMount() {
    this.getData()
    this.polling = setInterval(() => this.getData(), 5000)
  }

  componentWillUnmount() {
    clearInterval(this.polling)
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
      return <Loading />
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
