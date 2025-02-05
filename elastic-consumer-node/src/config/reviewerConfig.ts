import { REVIEWER_CONSUMER, REVIEWER_EXCHANGE, REVIEWER_ROUTING_KEY } from '../constants/queueConstant'


export const reviewerConfig =  Object.freeze({
    queueName : REVIEWER_CONSUMER,
    exchange : REVIEWER_EXCHANGE,
    routingKey : REVIEWER_ROUTING_KEY
})