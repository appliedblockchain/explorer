import server from './app'
import { log } from './utils'

server.listen(3000, () => {
  log.start('Listening on port 3000...')
})
