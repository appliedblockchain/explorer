/**
 @NOTE: Express does not support ES2017 `async` functions by default so using it
 as handlers without try/catch block can cause the handler to not pass on error
 to the Express error handler.
 This helper function allows handlers to be written without the same repeated
 try/catch block below.
 */

/* :: Function -> Function */
export const withError = routeHandler => async (request, respond, next) => {
  try {
    await routeHandler(request, respond, next)
  } catch (error) {
    next(error)
  }
}
