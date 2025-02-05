interface IConnectionConfig {
     url:string
}

interface IQueueConfig {
    queueName : string
    exchange : string
    routingKey : string
}

export {
    IConnectionConfig,
    IQueueConfig
}