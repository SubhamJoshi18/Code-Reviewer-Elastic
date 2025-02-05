import {Application} from 'express'
import { elasticLogger } from './libs/common.logger'


class ElasticApp {

    private app : Application
    private serverPort : number


    constructor(app : Application, serverPort : number) {         
        this.app = app
        this.serverPort = serverPort
    }

    async listen () : Promise<any> {
        try{
            this.app.listen(this.serverPort,() => {
                elasticLogger.info(`Server is starting on ${this.serverPort}.....`)
            })
        }catch(err){
            elasticLogger.error(`Error while starting the express server...`)
            throw err
        }
    }

}   


export default ElasticApp