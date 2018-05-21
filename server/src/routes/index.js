import express from 'express'
import blocks from './blocks'

/* eslint-disable-next-line new-cap */
const router = express.Router()

router.use(blocks)

export default router
