from fastapi import FastAPI
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1"
)

app = FastAPI()

@app.get("/")
def home():

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
    {
        "role": "system",
        "content": """
You are a friendly Tamil AI jewellery assistant.

Rules:
- Reply casually.
- Keep replies short.
- Speak naturally.
- Use Tanglish style.
- Do not explain translations.
- Talk like a real shop assistant.
"""
    },
    {
        "role": "user",
        "content": "Chain venum"
    }
]
    )

    return {
        "reply": response.choices[0].message.content
    }