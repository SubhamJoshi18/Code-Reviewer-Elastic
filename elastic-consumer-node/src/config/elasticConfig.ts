import { fetchEnv } from '../utils/getEnvValue'

export const elasticConfig = {
    node : fetchEnv('ELASTIC_URL')
}