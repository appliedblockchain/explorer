import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import isNull from 'lodash/isNull'
import { Main, Navbar, Loading } from '../components'
import * as api from '../api'

/* :: Function -> Function */
export const createBlock = (BlockView) => {
  class Block extends Component {
    state = {
      block: null
    }

    componentDidMount() {
      this.getBlock()
    }

    async getBlock() {
      const blockNumber = parseInt(this.props.match.params.number, 10)
      const block = await api.getBlock(blockNumber)

      this.setState({ block })
    }

    render() {
      const { block } = this.state

      if (isNull(block)) {
        return <Loading />
      }

      return (
        <Fragment>
          <Navbar />
          <Main>
            <BlockView info={block} />
          </Main>
        </Fragment>
      )
    }
  }

  Block.propTypes = {
    match: PropTypes.object.isRequired
  }

  return Block
}
