import { IndicesCreateResponse } from "@elastic/elasticsearch/lib/api/types";
import { getElasticClient } from "../connect";
import { Client } from "@elastic/elasticsearch";
import { ELASTIC_CODE_INDEX } from '../../constants/elasticConstants'
import { checkIndexExists } from '../../utils/elasticUtils'
import { elasticLogger } from '../../libs/common.logger'

const createCodeIndex  = async () => {
    const client : Client = await getElasticClient()

    const isExists = checkIndexExists(client,ELASTIC_CODE_INDEX)

    if(!isExists){
        elasticLogger.error(`The Index is already Exists, Index Name : ${ELASTIC_CODE_INDEX}`)
        return true
    }

    const createIndex : IndicesCreateResponse = await client.indices.create({
        index : ELASTIC_CODE_INDEX,
        body : {
            mappings : {
                properties :{
                    code_template : {type : "text"}
                }
            }
        }
    })

const isAcknowleged = createIndex.acknowledged
const isSameIndex = ELASTIC_CODE_INDEX.includes(createIndex.index)
return isAcknowleged && isSameIndex
}


export default createCodeIndex