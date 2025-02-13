import json
import pika
from config.QueueConfig import reviewer_queue_config

def publish_to_analyzer(pika_channel,message):
    try:
        if not pika_channel or not pika_channel.is_open:
            raise ValueError("Invalid or closed Pika channel")

        pika_channel.exchange_declare(exchange=reviewer_queue_config['exchange'], exchange_type='direct', durable=True)

        pika_channel.queue_declare(queue=reviewer_queue_config['queueName'], durable=True)
        pika_channel.queue_bind(exchange=reviewer_queue_config['exchange'], queue=reviewer_queue_config['queueName'], routing_key=reviewer_queue_config['routingKey'])


        pika_channel.basic_publish(
            exchange=reviewer_queue_config['exchange'],
            routing_key=reviewer_queue_config['routingKey'],
            body=json.dumps(message),
            properties=pika.BasicProperties(
                delivery_mode=2
            )
        )

        print(f"Message published to exchange '{reviewer_queue_config['exchange']}' with routing key '{reviewer_queue_config['queueName']}'")
    except Exception as error:
        print(f"Error while publishing to {reviewer_queue_config['queueName']}: {error}")

