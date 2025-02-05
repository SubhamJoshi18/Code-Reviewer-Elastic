import pika


def create_channel(connection : pika.connection):
    try:
        is_open_connection = connection.is_open
        if not is_open_connection:
            raise Exception('Connection is not Open')

        channel = connection.channel()
        return channel
    except Exception as error:
        print(f'Error while creating the channel, Please check the Connection, Error : {error}')