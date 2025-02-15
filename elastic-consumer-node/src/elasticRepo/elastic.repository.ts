import { Client } from "@elastic/elasticsearch";
import { getElasticClient } from '../elastic/connect'
import { WriteResponseBase } from "@elastic/elasticsearch/lib/api/types";


class ElasticRepository {

    private elasticClient : Client

        
    private async initalizeClient () {
        const client  =await  getElasticClient()
        return client
    }

    public async insertDocuments(docPayload : {code : string}, indexName : string) : Promise<WriteResponseBase> {
        this.elasticClient = await this.initalizeClient()
        const { code : parseCode } = docPayload 

        const savedResult  : WriteResponseBase = await this.elasticClient.index({
            index : indexName,
            document : {
                code : parseCode
            }
        })
        return savedResult

    }


    public async tokenizeWords(codeWord : string) {
        this.elasticClient = await this.initalizeClient()
        const tokenizeCode = await this.elasticClient.indices.analyze({
            text : codeWord
        })
        return tokenizeCode
    }
}

export default ElasticRepository