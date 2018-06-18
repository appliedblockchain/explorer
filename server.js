'use strict'
const fs = require('fs')
const path = require('path')
const serve = require('koa-static')
const { createServer } = require('@appliedblockchain/block-explorer-server')

const app = createServer({ prefix: '/api/v1' })

/** @NOTE: server/client includes the SPA client production build. */
if (process.env.NODE_ENV === 'production') {
  const clientDir = path.resolve(__dirname, 'build')
  app.use(serve(clientDir))

  const indexPath = path.resolve(clientDir, 'index.html')
  const clientIndex = fs.readFileSync(indexPath, 'utf8')

  app.use((ctx) => {
    ctx.body = clientIndex
  })
}

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})
