'use strict'

/* :: any -> boolean */
const isPromise = val => Object.prototype.toString.call(val).includes('Promise')

module.exports = {
  isPromise
}
