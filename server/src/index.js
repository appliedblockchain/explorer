import server from './app'
import { log } from './utils'

server.listen(3001, () => {
  log.start('Listening on port 3001...')
})
