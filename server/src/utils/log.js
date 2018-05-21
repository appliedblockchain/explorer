import { Signale } from 'signale'

/**
 👋 Hackable console logger
 https://github.com/klauscfhq/signale
 */
const log = new Signale({ scope: 'API' })

log.config({
  displayTimestamp: true
})

export { log }
