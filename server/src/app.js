import express from 'express'
import cors from 'cors'
import errorHandler from 'errorhandler'
import createError from 'http-errors'
import routes from './routes'
import { isDevelopment } from './config'
import { log } from './utils'

const app = express()


/** Disable `Powered by Express` header on response for better security */
app.disable('x-powered-by')


/**
 Global express middlewares
 [1]. Add Cross origin resource sharing support.
 [2]. Add express error handler for development.
 */
app.use(cors())
if (isDevelopment()) {
  app.use(errorHandler())
}


/** API Routes */
app.use('/api/v1', routes)


/** Catch unknown routes */
app.use((req, res, next) => next(new createError.NotFound()))


/**
 Handle all request errors!
 [1]. Print & send stacktrace only in development.
 */

/* eslint-disable no-unused-vars */
app.use((error, request, respond, next) => {
  if (isDevelopment()) {
    log.error(error) /* [1] */
  }

  respond.status(error.status || 500)
  respond.json({
    errors: {
      message: error.message,
      error: isDevelopment() ? error : {} /* [1] */
    }
  })
})
/* eslint-enable no-unused-vars */

export default app
