import dotenv from 'dotenv'

dotenv.config()


const getEnvValue = (envkey : string) : any  => {
     return  process.env.hasOwnProperty(envkey) ?  process.env[envkey] : null
}

const checkEnvKey = (envKey : string) : boolean => {
     return process.env.hasOwnProperty(envKey)
}

export const fetchEnv = (envkey : string) => {
    return checkEnvKey(envkey) ? getEnvValue(envkey) : null
}


