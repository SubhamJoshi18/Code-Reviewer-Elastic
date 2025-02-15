import MainQueueConsumer from '../queues/mainQueueManager'
import ElasticRepository from '../elasticRepo/elastic.repository'
import { ELASTIC_CODE_INDEX } from '../constants/elasticConstants'


class ReviewService {

    private elasticRepository : ElasticRepository

    constructor(){
        this.elasticRepository = new ElasticRepository()
    }


    public async publishToAnalyzerAndSaveToElastic(code : any){
        let validPublished : boolean = false
        const publisherInstance = await MainQueueConsumer.create(true)
        
        const preparePayload = {
            code_template  : code,
            code_approved : false,
            code_result : {
                response : null
            }
        }

        const savedResult = await this.elasticRepository.insertDocuments(preparePayload,ELASTIC_CODE_INDEX)
        const statusResult = savedResult['result']
        const docResultIds = savedResult['_id']
        const isValidResult = statusResult.startsWith('c') && statusResult.endsWith('d')


        if(isValidResult){
            const parseTokens = await this.elasticRepository.tokenizeWords(preparePayload['code_template'])
            await publisherInstance.publishAnalyzer({
                code : code,
                parseTokens : parseTokens,
                docIds : docResultIds
            })
            validPublished = true
        }
        return validPublished
   
    }


}

export default new  ReviewService()