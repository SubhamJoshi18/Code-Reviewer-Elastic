
import {Channel, ConsumeMessage} from 'amqplib'
import { elasticLogger } from '../../libs/common.logger'
import { reviewerConfig } from '../../config/reviewerConfig'
import { handleReviewer } from '../handlers/reviewHandler'


const reviewerConsumer = async (channel : Channel)  : Promise<any> => {
    let validConsumer = true
     try{
        const {queueName,exchange} = reviewerConfig

        await channel.assertExchange(exchange,'direct',{durable:true})
        await channel.assertQueue(queueName,{durable:true})

        elasticLogger.info(`Waiting for message on the queue : ${queueName}`)

        channel.consume(queueName,async (msg : ConsumeMessage | null)  => {
             try{
                await handleReviewer(msg)
             }catch(err){
                elasticLogger.error(`Error while consuming the message, Returing the falsy value as the response`)
             }finally{
                if(msg){
                    elasticLogger.info(`Acknowledging the message...`)
                    channel.ack(msg)
                }
             }
        })

     }catch(err){
        elasticLogger.error(`Error while consuming the Payload from the consumer [Reviewer-consumer], Error : ${err.message}`)
        validConsumer = false
        return validConsumer
     }
}


export {
    reviewerConsumer
}