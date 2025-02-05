import json

def callback(ch, method, properties, body):

    try:
        data = json.loads(body)
        print(f"Processing message: {data}")

        ch.basic_ack(delivery_tag=method.delivery_tag)
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")