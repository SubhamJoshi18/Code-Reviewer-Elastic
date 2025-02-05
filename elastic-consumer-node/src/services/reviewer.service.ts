import MainQueueConsumer from '../queues/mainQueueManager'


class ReviewService {
   


    public async publishToAnalyzerAndSaveToElastic(code : any){
        const publisherInstance = await MainQueueConsumer.create(true)
        const preparePayload = {
            code  : code
        }
        const isPublished =  await publisherInstance.publishAnalyzer(preparePayload)
        return isPublished
    }


}

export default new  ReviewService()