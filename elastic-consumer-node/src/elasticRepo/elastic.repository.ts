import { Client } from "@elastic/elasticsearch";
import { getElasticClient } from '../elastic/connect'
import { WriteResponseBase } from "@elastic/elasticsearch/lib/api/types";
import { ELASTIC_CODE_INDEX } from '../constants/elasticConstants'


class ElasticRepository {

    private elasticClient : Client

        
    private async initalizeClient () {
        const client  =await  getElasticClient()
        return client
    }

    public async insertDocuments(docPayload : {code_template : string,code_approved : boolean, code_result : object}, indexName : string) : Promise<WriteResponseBase> {
        this.elasticClient = await this.initalizeClient()

        const savedResult  : WriteResponseBase = await this.elasticClient.index({
            index : indexName,
            document : {
                ...docPayload
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


    public async updateCodeStatus(codePayload : {code_approved : boolean, code_result : object,docIds : string}) {
            this.elasticClient = await this.initalizeClient()
            const updatedResult = await this.elasticClient.update({
                index : ELASTIC_CODE_INDEX,
                id : codePayload['docIds'],
                doc : {
                    code_approved : codePayload['code_approved'],
                    code_result  : codePayload['code_result']
                }
            })
            return updatedResult
    }
}

export default ElasticRepository