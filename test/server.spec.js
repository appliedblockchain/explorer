'use strict'
const request = require('supertest')
const app = require('../server/app')

describe('Unknown api routes', () => {
  const UNKNOWN_ROUTE = '/api/v1/foobar'

  it('responds with 404', async () => {
    expect.assertions(1)
    const { status } = await request(app).get(UNKNOWN_ROUTE)
    const expected = 404
    const actual = status

    expect(actual).toEqual(expected)
  })

  it('responds with a JSON error object', async () => {
    expect.assertions(1)
    const { body } = await request(app).get(UNKNOWN_ROUTE)
    const expected = {
      status: 'Not Found',
      statusCode: 404,
      error: `Path '${UNKNOWN_ROUTE}' does not exist.`
    }
    const actual = body

    expect(actual).toEqual(expected)
  })
})
