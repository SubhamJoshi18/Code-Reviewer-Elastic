import {Connection} from 'amqplib'
import amqplib from 'amqplib'
import { elasticLogger } from '../libs/common.logger'
import { fetchEnv } from '../utils/getEnvValue'
import { AMQPException } from '../exceptions/index'


export async function createConnection(){

    let retryConnectionCount = 4
    let retryConnectionStatus = true


    const connectRabbitMq = () => {
        try{    
            const rabbitmqUrl = fetchEnv('RABBITMQ_URL')

            if(!rabbitmqUrl){
                throw new Error()
            }

            const connection = 

        }catch(err){
            if(retryConnectionCount.toString().startsWith('0')) {
                elasticLogger.error(`The Maximum Retry Connection Count is Exceeded, Try again Later.. Retry Count : ${retryConnectionCount}`)
                return null
            }
            retryConnectionCount -= 1
            elasticLogger.error(`Retrying the RabbitMQ Connection Retry Count : ${retryConnectionCount}`)
            return connectRabbitMq()
        }
    }

    while(retryConnectionStatus && !retryConnectionCount.toString().startsWith('0')) {
        connectRabbitMq()
    }


}