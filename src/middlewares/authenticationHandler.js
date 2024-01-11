import jwt from 'jsonwebtoken'
import Admin from '../../DB/models/admin.model.js'
import Employee from '../../DB/models/employee.mode.js'
import Student from '../../DB/models/student.model.js'

export const authenticationHandler = (entityModel) => {
  return async (req, res, next) => {
    const { accesstoken } = req.headers
    if (!accesstoken)
      return next(new Error('No Token has been sent', { cause: 400 }))
    if (!accesstoken.startsWith(process.env.TOKEN_PREFIX))
      return next(new Error('no token prefix has been found', { cause: 400 }))
    const token = accesstoken.split(process.env.TOKEN_PREFIX)[1]
    const decodedData = jwt.verify(token, process.env.SECRET_KEY)
    const isUserExisted = await entityModel.findOne({
      where: { email: decodedData.email },
    })
    if (!isUserExisted)
      return next(
        new Error('no user has been found by this token !', { cause: 404 })
      )
    req.authenticatedUser = isUserExisted
    next()
  }
}
