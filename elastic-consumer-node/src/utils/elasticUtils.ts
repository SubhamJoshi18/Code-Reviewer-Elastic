import { Client } from "@elastic/elasticsearch";


const checkIndexExists = async (elasticClient : Client, indexName : string) : Promise<boolean> => {
    const isIndexExists = await elasticClient.indices.get({index : indexName})
    return isIndexExists ? true : false
}


export {
    checkIndexExists
}