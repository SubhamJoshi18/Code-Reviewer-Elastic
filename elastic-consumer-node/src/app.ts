import {Application} from 'express'



class ElasticApp {


    private app : Application
    private serverPort : number


    constructor(app : Application, serverPort : number) {         
        this.app = app
        this.serverPort = serverPort
    }


    

}   


export default ElasticApp