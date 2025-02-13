from constants.QueueConstant import ANALYZER_CONSUMER,ANALYZER_EXCHANGE,ANALYZER_ROUTING_KEY
from constants.QueueConstant import REVIEWER_CONSUMER,REVIEWER_EXCHANGE,REVIEWER_ROUTING_KEY

analyzer_queue_config = {
    "queueName" : ANALYZER_CONSUMER,
    "exchange":ANALYZER_EXCHANGE,
    "routingKey":ANALYZER_ROUTING_KEY
}

reviewer_queue_config = {
    "queueName": REVIEWER_CONSUMER,
    "exchange" : REVIEWER_EXCHANGE,
    "routingKey": REVIEWER_ROUTING_KEY
}