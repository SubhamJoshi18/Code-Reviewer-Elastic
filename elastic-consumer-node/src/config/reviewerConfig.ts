import { ANALYZER_CONSUMER, ANALYZER_EXCHANGE, ANALYZER_ROUTING_KEY, REVIEWER_CONSUMER, REVIEWER_EXCHANGE, REVIEWER_ROUTING_KEY } from '../constants/queueConstant'


export const reviewerConfig =  Object.freeze({
    queueName : REVIEWER_CONSUMER,
    exchange : REVIEWER_EXCHANGE,
    routingKey : REVIEWER_ROUTING_KEY
})

export const analyzerConfig = Object.freeze({
    queueName : ANALYZER_CONSUMER,
    exchange : ANALYZER_EXCHANGE,
    routingKey : ANALYZER_ROUTING_KEY
})