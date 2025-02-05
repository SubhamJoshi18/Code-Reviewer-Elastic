import {Request,Response} from 'express'
import statusCode from 'http-status-codes'

class ReviewerController {

    public async reviewCode (req:Request,res:Response) {
        try{
            
        }catch(err){
            return res.status(statusCode.BAD_GATEWAY).json({
                message : err.message
            })
        }
    }
}

export default new ReviewerController()