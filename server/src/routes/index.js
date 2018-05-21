import express from 'express'

/* eslint-disable-next-line new-cap */
const router = express.Router()

router.get('/', (request, respond) => {
  respond.json({ message: 'Hello, World!' })
})

export default router
