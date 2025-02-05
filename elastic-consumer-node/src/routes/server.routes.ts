import {Application, Request, Response } from 'express'
import reviewerRouter from './reviewer.routes'
import statusCodes from 'http-status-codes'

export const serverRouter = (app : Application) => {

    app.use('/api',[reviewerRouter])

    app.use('*',(req:Request,res:Response) : any => {
        return res.status(statusCodes.BAD_GATEWAY).json({
            message : `The Url you requested ${req.originalUrl} Does not Exists`,
            statusCode : statusCodes.BAD_GATEWAY
        })
    })
}