import json
import requests
from queues.CreateChannel import create_channel
from queues.CreateConnection import create_connection
from queues.publisher.AnalyzerPublisher import publish_to_analyzer

def callback(ch, method, properties, body):
    try:
        data = json.loads(body)
        print(f'The Message Received {data}')


        mock_payload = {
            "code_approved":True,
            "code_result":{
                "response": {
                    "fixed_code": 'print("Hello World")',
                    "description":"Use Single Quotation Instead of Double"
                }
            },
            "docIds":data.get('docIds','')
        }

        connection = create_connection()
        channel = create_channel(connection)

        publish_to_analyzer(channel, mock_payload)

        ch.basic_ack(delivery_tag=method.delivery_tag)

    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
