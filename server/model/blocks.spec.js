'use strict'
const { times } = require('lodash')
const { getBlocks } = require('./blocks')
const { isPromise } = require('../../test/utils')

const TOTAL_BLOCKS = 100

const web3 = {
  eth: {
    getBlockNumber: jest.fn(async () => TOTAL_BLOCKS),
    getBlock: jest.fn(async number => ({
      number,
      transactions: []
    }))
  }
}

describe('blocks.getBlocks()', () => {
  it('returns a promise', () => {
    const result = getBlocks(web3)
    const expected = true
    const actual = isPromise(result)

    expect(actual).toEqual(expected)
  })

  describe('Resolved Promise', () => {
    it('returns a array', async () => {
      expect.assertions(1)
      const result = await getBlocks(web3)
      const expected = true
      const actual = Array.isArray(result)

      expect(actual).toEqual(expected)
    })

    it('returns 10 blocks by default', async () => {
      expect.assertions(1)
      const result = await getBlocks(web3)
      const expected = 10
      const actual = result.length

      expect(actual).toEqual(expected)
    })

    it('returns the correct blocks', async () => {
      expect.assertions(1)
      const expected = times(10).map(number => ({
        number: 100 - number,
        transactions: []
      }))
      const actual = await getBlocks(web3)

      expect(actual).toEqual(expected)
    })

    describe('limit = 25', () => {
      const limit = 25

      it('returns 25 blocks', async () => {
        expect.assertions(1)
        const result = await getBlocks(web3, { limit })
        const expected = limit
        const actual = result.length

        expect(actual).toEqual(expected)
      })
    })

    describe('order = desc', () => {
      it('returns the correct blocks', async () => {
        expect.assertions(1)
        const expected = times(10).map(number => ({
          number,
          transactions: []
        }))
        const actual = await getBlocks(web3, { order: 'asc' })

        expect(actual).toEqual(expected)
      })
    })
  })
})
