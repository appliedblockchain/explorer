import express from 'express'
import cors from 'cors'
import errorHandler from 'errorhandler'
import createError from 'http-errors'
import { errors } from 'celebrate'
import http from 'http'
import routes from './routes'
import { isDevelopment } from './config'
import { log } from './utils'

const app = express()


/** Disable `Powered by Express` header on response for better security */
app.disable('x-powered-by')


/**
 🌍 Global express middlewares
 [1]. Add Cross origin resource sharing support.
 [2]. Add express error handler for development.
 */
app.use(cors())
if (isDevelopment()) {
  app.use(errorHandler())
}


/** ⭐️ API Routes */
app.use('/api/v1', routes)


/** 🧐 Catch unknown routes */
app.use((req, res, next) => next(createError(404, `Path '${req.path}' does not exist.`)))


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

export default app
