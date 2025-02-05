import json
from queues.handlers.AnalyzerHandler import callback
from constants.QueueConstant import ANALYZER_CONSUMER

def analyzer_consumer(channel, queue_name=ANALYZER_CONSUMER):


    channel.queue_declare(queue=queue_name, durable=True)

    channel.basic_qos(prefetch_count=1)

    channel.basic_consume(queue=queue_name, on_message_callback=callback)

    print(f"[*] Waiting for messages in '{queue_name}'. To exit, press CTRL+C")
    channel.start_consuming()
