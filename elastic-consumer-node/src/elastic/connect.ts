import { Client } from "@elastic/elasticsearch";
import { elasticLogger } from '../libs/common.logger'
import { elasticConfig } from '../config/elasticConfig'
import createCodeIndex from "./indices/code.indices";

const checkClusterHealth = async (client : Client) => {
    const clusterHealth = await client.cluster.health()
    const clusterName = clusterHealth['cluster_name']

    elasticLogger.info(`The Cluster is running on ${clusterName}`)
    const clusterStatus = clusterHealth['status']

    if(clusterStatus.includes("yellow")){
        elasticLogger.info(`The Cluster Health is on the risk it is currenlty on the yellow ${clusterStatus}`)
        return false
    }
    return clusterStatus.includes("green")
}


const initializeIndices = async () => {        
    const promiseIndices = await Promise.allSettled([createCodeIndex])
    return promiseIndices.filter((data:any) => data.status !== 'fulfilled').length === 0
}

const connectToElastic = async (getClientFlag=false) : Promise<any> => {
    if(getClientFlag){
        return new Client(elasticConfig)
    }
    let elasticRetry = 4
    let elasticRetryStatus = true

    while(elasticRetryStatus && elasticRetry > 0) {
        try{
            const elasticClient = new Client(elasticConfig)
            const validHealth = await checkClusterHealth(elasticClient)
            if(validHealth){
                const indexInitialize = await initializeIndices()
                elasticLogger.info(`Index Created Status : ${indexInitialize}`)
                elasticLogger.info(`The Elastic Cluster Health is Green, Good to Go !!`)
                return elasticClient
            }
            return null
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


const getElasticClient = async () => {
    const elasticClient = connectToElastic(true)
    return elasticClient
}





export  {
    connectToElastic,
    getElasticClient
}