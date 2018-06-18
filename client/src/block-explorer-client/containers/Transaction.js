import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import isNull from 'lodash/isNull'
import { Navbar, Main, Loading } from '../components'
import * as api from '../api'

/* :: Function -> Function */
export const createTransaction = (TransactionView) => {
  class Transaction extends Component {
    state = {
      transaction: null
    }

    componentDidMount() {
      this.getTransaction()
    }

    async getTransaction() {
      const { txhash } = this.props.match.params
      const transaction = await api.getTransaction(txhash)

      this.setState({ transaction })
    }

    render() {
      const { transaction } = this.state

      if (isNull(transaction)) {
        return <Loading />
      }

      return (
        <Fragment>
          <Navbar />
          <Main>
            <TransactionView info={transaction} />
          </Main>
        </Fragment>
      )
    }
  }

  Transaction.propTypes = {
    match: PropTypes.object.isRequired
  }

  return Transaction
}
