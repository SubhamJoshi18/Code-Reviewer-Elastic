import express from 'express'
import { fetchEnv } from './utils/getEnvValue'
import ElasticApp from './app'

const app = express()
const port = fetchEnv('PORT')

const elasticApp = new ElasticApp(app,port)
