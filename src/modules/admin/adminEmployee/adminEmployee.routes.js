import { Router } from 'express'
import * as adminEmployeeControllers from './adminEmpoyee.controllers.js'
import expressAsyncHandler from 'express-async-handler'
const adminEmployee = Router({ mergeParams: true })

adminEmployee.get(
  '/',
  expressAsyncHandler(adminEmployeeControllers.getAllEmployees)
)
adminEmployee.get(
  '/:employeeId',
  expressAsyncHandler(adminEmployeeControllers.getEmployee)
)

export default adminEmployee
