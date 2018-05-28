import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isNull from 'lodash/isNull'
import * as api from '../api'

export class Transaction extends Component {
  state = {
    transaction: null
  }

  componentDidMount() {
    this.getTransaction()
  }

  async getTransaction() {
    const { txHash } = this.props.match.params
    const transaction = await api.getTransaction(txHash)

    this.setState({ transaction })
  }

  render() {
    const { transaction } = this.state

    if (isNull(transaction)) {
      return <p>Loading...</p>
    }

    return (
      <pre>
        {JSON.stringify(transaction, null, 2)}
      </pre>
    )
  }
}

Transaction.propTypes = {
  match: PropTypes.object.isRequired
}
