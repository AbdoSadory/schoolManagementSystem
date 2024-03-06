import { Router } from 'express'
import expressAsyncHandler from 'express-async-handler'
import dataValidationHandler from '../../../middlewares/dataValidationHandler.js'
import * as adminFinanceDataValidationSchemas from './adminFinance.dataValidationSchemas.js'
import * as adminFinanceControllers from './adminFinance.controllers.js'
const adminFinance = Router({ mergeParams: true })

adminFinance.get(
  '/',
  expressAsyncHandler(adminFinanceControllers.getAllFinance)
)

adminFinance.post(
  '/addFinanceData',
  dataValidationHandler(
    adminFinanceDataValidationSchemas.adminFinanceCreateFinance
  ),
  expressAsyncHandler(adminFinanceControllers.createFinance)
)

adminFinance.put(
  '/updateFinanceData/:financeYear',
  dataValidationHandler(
    adminFinanceDataValidationSchemas.adminFinanceUpdateFinance
  ),
  expressAsyncHandler(adminFinanceControllers.updateFinance)
)
adminFinance.put(
  '/restoreFinanceData/:financeId',
  dataValidationHandler(
    adminFinanceDataValidationSchemas.adminFinanceRestoreFinance
  ),
  expressAsyncHandler(adminFinanceControllers.restoreFinance)
)

adminFinance.delete(
  '/deleteFinanceData/:financeYear',
  dataValidationHandler(
    adminFinanceDataValidationSchemas.adminFinanceDeleteFinance
  ),
  expressAsyncHandler(adminFinanceControllers.deleteFinance)
)
export default adminFinance
