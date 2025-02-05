import os
from dotenv import find_dotenv,load_dotenv

load_dotenv(find_dotenv())

env_config = {
    "url" : os.getenv('RABBITMQ_URL')
}
