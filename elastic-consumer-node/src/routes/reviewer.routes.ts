import {Router} from 'express'
import reviewerController from '../controller/reviewer.controller'
const reviewerRouter = Router()

reviewerRouter.post('/review/code',reviewerController.reviewCode as any)

export default reviewerRouter