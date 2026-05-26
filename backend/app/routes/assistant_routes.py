from fastapi import APIRouter
from pydantic import BaseModel
from app.services.ai_chat_service import generate_ai_reply

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@router.post("/chat")
def chat(request: ChatRequest):

    reply = generate_ai_reply(request.message)

    return {
        "reply": reply
    }