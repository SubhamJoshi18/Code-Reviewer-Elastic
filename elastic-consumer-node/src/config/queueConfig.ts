import { fetchEnv } from '../utils/getEnvValue'
import { IConnectionConfig } from '../queues/types'


export const ConnectionConfig : IConnectionConfig = {
    url : fetchEnv('RABBITMQ_URL')
}


