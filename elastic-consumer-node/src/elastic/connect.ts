import { Client } from "@elastic/elasticsearch";
import { elasticLogger } from '../libs/common.logger'
import { elasticConfig } from '../config/elasticConfig'

const connectToElastic = async () : Promise<any> => {
    let elasticRetry = 4
    let elasticRetryStatus = true

    while(elasticRetryStatus && elasticRetry > 0) {
        try{
            const elasticClient = new Client(elasticConfig)
            return elasticClient
        }catch(err){
            if(elasticRetry.toString().startsWith('0')){
                elasticLogger.error(`The Maximum Connection limit has been Exceeded, Error : ${err.message}`)
                process.exit(0)
            }
            elasticLogger.error(`Error while connnecting to the Elastic Search, Retrying again : ${elasticRetry}`)
            elasticRetry -= 1
            await connectToElastic()
        }
    }
  
}