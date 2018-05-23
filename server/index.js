'use strict'
const app = require('./app')
const { log } = require('./utils')

const port = process.env.PORT || 3000

app.listen(port, () => {
  log.start(`Listening on port ${port}...`)
})
