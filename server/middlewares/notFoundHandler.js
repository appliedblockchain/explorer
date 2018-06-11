'use strict'

const notFoundHandler = async (ctx, next) => {
  await next()
  if (ctx.status === 404) {
    ctx.throw(404, `Path '${ctx.path}' does not exist.`)
  }
}

module.exports = notFoundHandler
