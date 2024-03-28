import { Router } from 'express'
import * as authControllers from './auth.controllers.js'
import * as authValidationSchemas from './auth.dataValidationSchemas.js'
import expressAsyncHandler from 'express-async-handler'
import dataValidationHandler from '../../middlewares/dataValidationHandler.js'

const authRouter = Router()

authRouter.post(
  '/signIn',
  dataValidationHandler(authValidationSchemas.signInSchema),
  expressAsyncHandler(authControllers.signIn)
)

export default authRouter
