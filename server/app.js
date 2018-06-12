'use strict'
const path = require('path')
const fs = require('fs')
const http = require('http')
const Koa = require('koa')
const serve = require('koa-static')
const errorHandler = require('./middlewares/errorHandler')
const notFoundHandler = require('./middlewares/notFoundHandler')
const api = require('./routes')
const { isProduction } = require('./config')

const app = new Koa()

/** @NOTE: server/client includes the SPA client production build.  */
const clientDir = path.resolve(__dirname, 'client')
if (isProduction()) {
  app.use(serve(clientDir))
}

app
  .use(errorHandler)
  .use(notFoundHandler)
  .use(api.routes())
  .use(api.allowedMethods())

/** React client index.html is only served in production which handles routing. */
if (isProduction()) {
  const indexPath = path.resolve(clientDir, 'index.html')
  const clientIndex = fs.readFileSync(indexPath, 'utf8')

  app.use((ctx) => {
    ctx.body = clientIndex
  })
}

const server = http.createServer(app.callback())

module.exports = server
