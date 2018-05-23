import server from './app'
import { log } from './utils'

const port = parseInt(process.env.PORT || '3001', 10)

server.listen(port, () => {
  log.start(`Listening on port ${port}...`)
})
