import {Connection ,Channel} from 'amqplib'
import { elasticLogger } from '../libs/common.logger'
import { AMQPException } from '../exceptions/index'

async function createChannel (connection : Connection)  :  Promise<any | Channel> {

    connection.on('connection', () => {
        elasticLogger.info(`The Connection is Alive, Trying to create an Channel for the Consumers`)
    })


    try{
        connection.on('error', () => {
            elasticLogger.error(`Connection is not Alive`)
            throw new AMQPException(`Connection is not Open, Error while creating to the channels`)
        })

        const channel = await connection.createChannel()
        return channel
    }catch(err){
        elasticLogger.error(`Channel cannot be created, Try again later`)
        process.exit(0)
    }

}


export {
    createChannel
}