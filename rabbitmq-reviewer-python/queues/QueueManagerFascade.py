from queues.CreateConnection import create_connection
from queues.CreateChannel import create_channel
from queues.consumers.AnalyzerConsumer import analyzer_consumer

class QueueManager:

    connection = None
    channel = None

    def __init__(self):
        pass


    def __init(self):
        self.connection = create_connection()
        self.channel = create_channel(self.connection)


    def create(self):
        main_instance = QueueManager()
        main_instance.__init()
        return main_instance




    def init_queue_consumers(self):
        analyzer_consumer(self.channel)





