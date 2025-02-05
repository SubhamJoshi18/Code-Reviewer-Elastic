import {CorsOptions} from 'cors'

const corsConfg : CorsOptions = {
    origin : 'http://localhost:5173',
    methods : ['GET','POST','PUT','DELETE','PATCH'],
}

export {
    corsConfg
}