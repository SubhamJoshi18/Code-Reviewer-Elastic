import express,{Application} from 'express'
import { corsConfg } from '../config/corsConfig'
import cors from 'cors'

export const serverMiddleware = (app : Application) => {
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    app.use(cors(corsConfg))
}