'use strict'
const express = require('express')
const createError = require('http-errors')
const blocks = require('./blocks')
const transactions = require('./transactions')

const api = express.Router() // eslint-disable-line new-cap

/** ⭐️ API Routes */
api.use(blocks)
api.use(transactions)

/** 🧐 Catch unknown API routes */
api.use((req, res, next) => next(createError(404, `Path '${req.path}' does not exist.`)))

module.exports = api
