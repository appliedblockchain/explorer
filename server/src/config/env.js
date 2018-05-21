/* :: () -> boolean */
const isProduction = () => process.env.NODE_ENV === 'production'

/* :: () -> boolean */
const isDevelopment = () => process.env.NODE_ENV === 'development'

export {
  isProduction,
  isDevelopment
}
