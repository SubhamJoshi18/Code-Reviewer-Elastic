import json
import requests
from queues.CreateChannel import create_channel
from queues.CreateConnection import create_connection
from queues.publisher.AnalyzerPublisher import publish_to_analyzer

# Set up Gemini AI API Key and endpoint
API_KEY = "AIzaSyDzwGCeIJtw5tXjYgE0bOBbmsQ6ayd4OMc"
GEMINI_API_URL = "https://api.generative.ai/v1/generate"

def review_code_with_gemini(code):
    """Sends the code to Gemini AI for review and returns allow/deny decision."""
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "model": "gemini-pro",
        "messages": [
            {"role": "system", "content": "You are a strict code reviewer. You check for security, performance, and best practices. Only return 'allow' if the code is perfect, otherwise return 'deny' with a reason."},
            {"role": "user", "content": f"Review this code strictly and return 'allow' or 'deny' with a reason:\n\n{code}"}
        ]
    }

    try:
        response = requests.post(GEMINI_API_URL, headers=headers, json=data)
        response.raise_for_status()  # Raise an exception for 4xx/5xx responses

        result = response.json().get("choices", [{}])[0].get("message", {}).get("content", "").strip()
        return result if result else "deny - No response content."

    except requests.exceptions.RequestException as e:
        return f"deny - Error while analyzing code: {str(e)}"

def callback(ch, method, properties, body):
    try:
        data = json.loads(body)
        code = data.get("code", "")

        if not code:
            decision = "deny - No code provided."
        else:
            decision = review_code_with_gemini(code)

        print(f"Review Result: {decision}")

        connection = create_connection()
        channel = create_channel(connection)
        publish_to_analyzer(channel, decision)

        ch.basic_ack(delivery_tag=method.delivery_tag)

    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
