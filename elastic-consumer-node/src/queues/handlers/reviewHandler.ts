import {ConsumeMessage} from 'amqplib'
import {safeParseJson} from '../../utils/parseJson'
import { AMQPException } from '../../exceptions/index'
import { elasticLogger } from '../../libs/common.logger'
import ElasticRepository from '../../elasticRepo/elastic.repository'

async function handleReviewer (msg : ConsumeMessage | null) : Promise<any> {
    let validHandler = false
    const elasticRepo = new ElasticRepository()
    try{
        if(msg && msg.content){
            const content = safeParseJson(msg.content.toString())


            if(!content){
                throw new AMQPException(`reviewer-consumer: The Payload Received by the consumer is not valid payload`)
            }

            elasticLogger.info(`The Message is Received : ${JSON.stringify(content)}`)

            const {code_approved , code_result , docIds} = content

            const updatedPayload = {
                code_approved,
                code_result,
                docIds
            }

            const updatedElastic = await elasticRepo.updateCodeStatus(updatedPayload as any)
            
            if(updatedElastic['result'].includes('updated')){
                validHandler = true
            }

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

