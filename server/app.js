'use strict'
const express = require('express')
const errorHandler = require('errorhandler')
const { errors } = require('celebrate')
const http = require('http')
const path = require('path')
const routes = require('./routes')
const { isDevelopment, isProduction } = require('./config')
const { log } = require('./utils')

const app = express()


/** Disable `Powered by Express` header on response for better security */
app.disable('x-powered-by')


/**
 🌍 Global express middlewares
 [1]. Add express error handler for development.
 [2]. Serve React SPA compiled static files.
 */
if (isDevelopment()) {
  app.use(errorHandler()) /* [1] */
}

const clientDir = path.resolve(__dirname, 'client')
if (isProduction()) {
  app.use(express.static(clientDir)) /* [2] */
}


/** ⭐️ API Routes */
app.use('/api/v1', routes)


/** ⭐️ SPA Client
 @NOTE: For development server is used only for the API. Webpack Dev server is
 used to serve client.
 */
if (isProduction()) {
  const index = path.resolve(clientDir, 'index.html')

  app.get('*', (request, respond) => {
    respond.sendFile(index)
  })
}


/**
 ❌ Handle all request errors!

 [1]. Print & send stacktrace only in development.
 [2]. Celebrate Joi validator comes with it's own error handler that sends useful
 validation information. Non celebrate errors are passed on to the next middleware.
 */

/* eslint-disable no-unused-vars */
if (isDevelopment()) {
  app.use((error, request, respond, next) => {
    log.error(error) /* [1] */
    next(error)
  })
}

app.use(errors()) /* [2] */
app.use((err, request, respond, next) => {
  const statusCode = err.status || 500

  respond.status(statusCode).json({
    statusCode,
    error: http.STATUS_CODES[statusCode],
    message: err.message,
    _error: isDevelopment() ? err : {} /* [1] */
  })
})
/* eslint-enable no-unused-vars */

module.exports = app
