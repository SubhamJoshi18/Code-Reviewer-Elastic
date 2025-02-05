from queues.QueueManagerFascade import QueueManager




if __name__ == "__main__":
    main_instance = QueueManager().create()
    main_instance.init_queue_consumers()