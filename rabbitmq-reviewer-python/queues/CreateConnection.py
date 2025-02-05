import pika
from pika.exceptions import AMQPConnectionError
from config.EnvConfig import env_config


def create_connection():

    retry_connection_status = True
    retry_connection_count = 4

    while retry_connection_status and retry_connection_count > 0:

        try:
            url = env_config['url']
            connection = pika.BlockingConnection(pika.ConnectionParameters(url))
            return connection
        except AMQPConnectionError as amqp_error:
            is_maximum_exceeded = str(retry_connection_count).startswith('0')
            if is_maximum_exceeded:
                retry_connection_status = False
                print(f'Maximum Exceeded Retry Count , Error Trying to RabbitMQ Connection Failed : {amqp_error}')

            print(f'Error Connecting to the Rabbit MQ, Trying again Retry Count : {retry_connection_count}')
            retry_connection_status -= 1
            create_connection()
