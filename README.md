## 🚀 Code Reviewer System

A scalable Code Reviewer system that analyzes code submissions using AI. The system leverages React for the frontend, Node.js with Express for the backend, Elasticsearch for storage, and RabbitMQ for message queuing. The Python-based analyzer processes code and returns feedback.
- Frontend: React.js for dynamic and responsive user interfaces
- Backend: Node.js with Express for managing HTTP requests and API endpoints
- Storage: Elasticsearch for fast and efficient data retrieval
- Message Queuing: RabbitMQ for handling asynchronous message processing
= Code Analysis: Python-based analyzer for code evaluation and feedback


# 🏗️ Architecture Overview
                            
                            +------------+      +--------------+      +------------------+
                            |   React    |----->| Node.js API  |----->|   Elasticsearch  |
                            |  (Frontend)|      |  (Backend)   |      |    (Storage)     |
                            +------------+      +--------------+      +------------------+
                                                        |
                                                        v
                                                  +------------+
                                                  | RabbitMQ   |  (Message Queue)
                                                  +------------+
                                                        |
                                                        v
                                                  +-------------+
                                                  | Python AI   |  (Code Analyzer)
                                                  +-------------+
                                                        |
                                                        v
                                                  +-------------+
                                                  | Analyzer    |  (Processing Queue)
                                                  +-------------+
                                                        |
                                                        v
                                                  +-------------+
                                                  | Backend &   |  (Display Results)
                                                  | Frontend    |
                                                  +-------------+



# 🔥 Features
- Submit code via the React frontend
- Store code in Elasticsearch for indexing
- Queue submissions with RabbitMQ
- Analyze code using Python (AI/ML-based analysis)
- Send results back to the frontend for review


# 📦 Installation
Prerequisites
- Node.js & npm
- Python 3.x
- Elasticsearch
- RabbitMQ
- Docker
- Kibana


# 1️⃣ Clone the Repository
- git clone https://github.com/your-username/code-reviewer.git
- cd code-reviewer


# 2️⃣ Backend Setup (Node.js)

- cd elastic-consumer-node
- npm install
- npm start

# Set up a .env file with:

- PORT=3000
- RABBITMQ_URL=amqp://admin:admin@localhost:5672
- ELASTIC_URL=http://localhost:9200


# 3️⃣ Frontend Setup (React)
- cd code-reviewer-frontend
- npm install
- npm run dev
 
# 4️⃣ Analyzer Setup (Python)
- cd analyzer
- pip install -r requirements.txt
- python main.py


# 🚀 Running the System
- Start Elasticsearch and RabbitMQ from Docker Compsoe File - docker-compose up --build
- Run Backend (npm start)
- Run Frontend (npm run dev)
- Run Python Analyzer (python main.py)

# This project is MIT licensed. Feel free to contribute!
