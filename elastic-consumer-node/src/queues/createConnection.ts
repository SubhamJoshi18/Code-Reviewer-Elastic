import {Connection} from 'amqplib'
import amqp from 'amqplib'
import { elasticLogger } from '../libs/common.logger'
import { AMQPException } from '../exceptions/index'
import { IConnectionConfig } from './types'


async function createConnection(amqpOptions : IConnectionConfig) : Promise<any> {

    let retryConnectionCount = 4
    let retryConnectionStatus = true

    const connectRabbitMq = async () : Promise<any | Connection>  => {
        try{    
            const {url : rabbitmqUrl} = amqpOptions

            if(!rabbitmqUrl){
                throw new AMQPException(`There is no any Rabbitmq Url , Please Construct the valid Rabbitmq Url`)
            }

            const connection =  amqp.connect(rabbitmqUrl)
            return connection
        }catch(err){
            console.log(err)
            if(retryConnectionCount.toString().startsWith('0')) {
                elasticLogger.error(`The Maximum Retry Connection Count is Exceeded, Try again Later.. Retry Count : ${retryConnectionCount}`)
                return null
            }
            retryConnectionCount -= 1
            elasticLogger.error(`Retrying the RabbitMQ Connection Retry Count : ${retryConnectionCount}`)
            connectRabbitMq()
        }
    }

    while(retryConnectionStatus && !retryConnectionCount.toString().startsWith('0')) {
        const result : Connection = await connectRabbitMq()
        if(!result){
            continue
        }
        return result
    }
}

export {
    createConnection
}