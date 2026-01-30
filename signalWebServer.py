from flask import Flask, jsonify, render_template, request
from flask_socketio import SocketIO
import json
import os
import cv2
import mediapipe as mp
import threading
import time

# =========================
# AI IMPORT
# =========================
from aiLLM import generate_ai_feedback

# =========================
# Flask + SocketIO
# =========================
app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

# =========================
# Data paths
# =========================
DATA_DIR = "data"
ECG_FILE = os.path.join(DATA_DIR, "ecgData.json")
EMG_FILE = os.path.join(DATA_DIR, "emgData.json")
RESPONSE_FILE = os.path.join(DATA_DIR, "responseData.json")

os.makedirs(DATA_DIR, exist_ok=True)

# =========================
# AI RESPONSE CACHE
# =========================
ai_response_cache = {
    "text": "AI coach warming up...",
    "timestamp": 0
}

# =========================
# MediaPipe Pose
# =========================
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(
    model_complexity=1,
    min_detection_confidence=0.6,
    min_tracking_confidence=0.6
)

cap = cv2.VideoCapture("input_video.mp4")

def capture_pose():
    while True:
        ret, frame = cap.read()
        if not ret:
            cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
            continue

        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = pose.process(rgb)

        if results.pose_world_landmarks:
            landmarks = [
                {"x": lm.x, "y": lm.y, "z": lm.z}
                for lm in results.pose_world_landmarks.landmark
            ]
            socketio.emit("pose", landmarks)

        time.sleep(1 / 30)

# =========================
# AI BACKGROUND LOOP
# =========================
def ai_feedback_loop():
    global ai_response_cache

    while True:
        try:
            ai_response_cache["text"] = generate_ai_feedback()
            ai_response_cache["timestamp"] = time.time()
        except Exception as e:
            ai_response_cache["text"] = f"AI error: {e}"

        time.sleep(10)

# =========================
# ROUTES
# =========================
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/ecg")
def get_ecg():
    try:
        with open(ECG_FILE, "r") as f:
            return jsonify(json.load(f))
    except:
        return jsonify({"ecgValues": []})

@app.route("/emg")
def get_emg():
    try:
        with open(EMG_FILE, "r") as f:
            return jsonify(json.load(f))
    except:
        return jsonify({"emgValues": []})

@app.route("/update_response_data", methods=["POST"])
def update_response_data():
    try:
        data = request.json
        with open(RESPONSE_FILE, "w") as f:
            json.dump(data, f, indent=2)
        return jsonify({"status": "ok"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route("/ai_feedback")
def ai_feedback():
    return jsonify(ai_response_cache)

# =========================
# MAIN
# =========================
if __name__ == "__main__":
    threading.Thread(target=capture_pose, daemon=True).start()
    threading.Thread(target=ai_feedback_loop, daemon=True).start()

    socketio.run(app, host="127.0.0.1", port=5000, debug=False)
