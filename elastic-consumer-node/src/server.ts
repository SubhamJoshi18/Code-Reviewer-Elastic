import express from 'express'
import { fetchEnv } from './utils/getEnvValue'
import MainQueueConsumer from './queues/mainQueueManager'
import ElasticApp from './app'
import { elasticLogger } from './libs/common.logger'

const app = express()
const port = fetchEnv('PORT')

const elasticApp = new ElasticApp(app,port);

(async () => {
    new MainQueueConsumer().checkConnectionAlive().then(() => {
        elasticApp.listen().then(() => {
            elasticLogger.info(`Server is started on the http://localhost:${this.serverPort}`)
        }).catch((err) => {throw new Error(err.message)})
    }).catch((err) => {
            elasticLogger.error(`Error : ${err.message}`)
            process.exit(0)
    })
})()


