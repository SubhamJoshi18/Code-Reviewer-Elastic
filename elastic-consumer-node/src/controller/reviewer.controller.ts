import {Request,Response} from 'express'
import statusCode from 'http-status-codes'
import ReviewService from '../services/reviewer.service'

class ReviewerController {



    public async reviewCode (req:Request,res:Response) {
        try{
            const content = req.body.code
            const apiResponse = await ReviewService.publishToAnalyzerAndSaveToElastic(content)
            return res.status(statusCode.ACCEPTED).json({
                data : apiResponse
            })
        }catch(err){
            return res.status(statusCode.BAD_GATEWAY).json({
                message : err.message
            })
        }
    }
}

export default new ReviewerController()