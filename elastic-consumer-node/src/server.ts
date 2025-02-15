import express from 'express'
import { fetchEnv } from './utils/getEnvValue'
import MainQueueConsumer from './queues/mainQueueManager'
import ElasticApp from './app'
import { elasticLogger } from './libs/common.logger'
import {connectToElastic} from './elastic/connect'

const app = express()
const port = fetchEnv('PORT')

const elasticApp = new ElasticApp(app,port);

(async () => {
    const consumers =  MainQueueConsumer.create()
    consumers.then(() => {
        connectToElastic().then(() => {
            elasticLogger.info(`Elastic Connection Establish`)
            elasticApp.listen().then(() => {
                elasticLogger.info(`Server is started on the http://localhost:${port}`)
            }).catch((err) => {throw new Error(err.message)})
        })
        
    }).catch((err) => {
            elasticLogger.error(`Error while starting the server : ${err.message}`)
            process.exit(0)
    })
})()


