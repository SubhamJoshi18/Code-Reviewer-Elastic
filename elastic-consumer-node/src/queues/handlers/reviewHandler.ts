import {ConsumeMessage} from 'amqplib'
import {safeParseJson} from '../../utils/parseJson'
import { AMQPException } from '../../exceptions/index'
import { elasticLogger } from '../../libs/common.logger'

async function handleReviewer (msg : ConsumeMessage | null) : Promise<any> {
    let validHandler = true
    try{
        if(msg && msg.content){
            const content = safeParseJson(msg.content.toString())

            if(!content){
                throw new AMQPException(`reviewer-consumer: The Payload Received by the consumer is not valid payload`)
            }

            elasticLogger.info(`The Message is Received : ${JSON.stringify(content)}`)


        return validHandler
        }   
    }catch(err){
        const headersProps = msg ? msg.properties.headers : null
        console.log(headersProps)
        throw new err
    }
}   


export {
    handleReviewer
}

