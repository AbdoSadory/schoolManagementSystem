export const authorizationHandler = (...userRole) => {
  return async (req, res, next) => {
    const { authenticatedUser } = req
    const isUserAuthorizer = userRole.includes(authenticatedUser.role)
    if (!isUserAuthorizer) {
      return next(new Error('This user is not Authorized', { cause: 403 }))
    }
    req.isUserAuthorized = true
    next()
  }
}

export default authorizationHandler
