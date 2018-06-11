'use strict'
const { isObject } = require('lodash')
const { getEventParams, getEventSigs } = require('./transactions')
const { inventrustABI } = require('./transactions.fixtures')

describe('getEventParams()', () => {
  const eventInputs = [
    {
      indexed: true,
      name: 'from',
      type: 'address'
    },
    {
      indexed: true,
      name: 'to',
      type: 'address'
    },
    {
      indexed: false,
      name: 'value',
      type: 'uint256'
    }
  ]
  const eventData = '0x0000000000000000000000000000000000000000000000000000000000000000'
  const eventTopics = [
    '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    '0x000000000000000000000000012ffe461e81d913daca288d5a69d5fa83928303',
    '0x00000000000000000000000002fe0be210ffad876889dac3821a44d6d9f8e86e'
  ]

  const params = getEventParams(eventInputs, eventData, eventTopics)

  it('returns a array', () => {
    const expected = true
    const actual = Array.isArray(params)

    expect(actual).toEqual(expected)
  })

  it('appends correct decoded value to each input', () => {
    const expected = [
      {
        indexed: true,
        name: 'from',
        type: 'address',
        value: '0xFC378dAA952ba7f163c4a11628f55a4df523b3EF'
      },
      {
        indexed: true,
        name: 'to',
        type: 'address',
        value: '0x012ffE461E81d913dACA288d5a69d5fa83928303'
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
        value: '0'
      }
    ]
    const actual = params

    expect(actual).toEqual(expected)
  })
})


describe('getEventSigs()', () => {
  const sigs = getEventSigs(inventrustABI)

  it('returns a object', () => {
    const expected = true
    const actual = isObject(sigs)

    expect(actual).toEqual(expected)
  })

  it('returns the correct number of signatures', () => {
    const expected = 7
    const actual = Object.keys(sigs).length

    expect(actual).toEqual(expected)
  })

  it('returns the correct signature:eventABI mapping', () => {
    const sigEventName = [
      {
        name: 'Transfer',
        signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
      },
      {
        name: 'Approval',
        signature: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925'
      },
      {
        name: 'LicensePurchase',
        signature: '0x88e4fc30b217a1789ec377482cfbe22cfb76e32d03ee3208a6eac55211a99053'
      }
    ]

    sigEventName.forEach(({ signature, name }) => {
      const expected = name
      const actual = sigs[signature].name

      expect(actual).toEqual(expected)
    })
  })
})
