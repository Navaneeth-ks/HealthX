import json
from groq import Groq
import time

_last_ai_response = "AI warming up..."
_last_ai_time = 0
AI_INTERVAL = 10  # seconds

# =========================
# HARD-CODED GROQ CONFIG
# =========================
GROQ_API_KEY = "API KEY HERE"
MODEL_NAME = "llama-3.1-8b-instant"

client = Groq(api_key=GROQ_API_KEY)

# =========================
# AI FEEDBACK FUNCTION
# =========================
def generate_ai_feedback():
    """
    Reads responseData.json and generates coaching feedback.
    Calls the LLM at most once every 10 seconds.
    """

    global _last_ai_response, _last_ai_time

    now = time.time()

    # ⏱️ Throttle AI calls
    if now - _last_ai_time < AI_INTERVAL:
        return _last_ai_response

    try:
        with open("data/responseData.json", "r") as f:
            data = json.load(f)
    except:
        return _last_ai_response  # never say "no data"

    system_prompt = (
    "You are an exercise analysis assistant.\n"
    "Summarize movement quality, control, and physical strain in plain language.\n"
    "Do not mention numbers, angles, measurements, or technical terms.\n"
    "Ignore minor variations and normal effort.\n"
    "Only note issues that could affect safety or efficiency.\n"
    "Give one clear, practical tip to improve the movement.\n"
    "Keep the response to one or two short sentences.\n"
    "Do not use praise, motivation, or emotional language.\n"
    "Never say that data is missing or unavailable."
    "Only give one line answers in each category and no more than that and make the answers as short as possible"

)


    user_prompt = f"""
Workout data (JSON):

{json.dumps(data, indent=2)}

Give:
- Overall movement quality
- Rep consistency
- One simple coaching tip
"""

    try:
        response = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.4,
            max_tokens=120
        )

        _last_ai_response = response.choices[0].message.content.strip()
        _last_ai_time = now
        return _last_ai_response

    except Exception:
        return _last_ai_response