from flask import Flask, jsonify, render_template, request
from flask_socketio import SocketIO
import json
import os
import cv2
import mediapipe as mp
import threading
import time

# =========================
# Flask + SocketIO
# =========================
app = Flask(__name__)
socketio = SocketIO(
    app,
    cors_allowed_origins="*",
    async_mode="threading",
    ping_timeout=5,
    ping_interval=5
)


# =========================
# Data files
# =========================
dataFolder = "data"
ecgFile = os.path.join(dataFolder, "ecgData.json")
emgFile = os.path.join(dataFolder, "emgData.json")

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

            # 🔴 FIXED EVENT NAME
            socketio.emit("pose", landmarks)


# =========================
# Routes
# =========================
@app.route("/update_response_data", methods=["POST"])
def update_response_data():
    try:
        data = request.json
        data["timestamp"] = time.time()

        with open(os.path.join("data", "responseData.json"), "w") as f:
            json.dump(data, f, indent=2)

        return jsonify({"status": "ok"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/ecg")
def getEcg():
    try:
        with open(ecgFile, "r") as f:
            return jsonify(json.load(f))
    except:
        return jsonify({"ecgValues": []})

@app.route("/emg")
def getEmg():
    try:
        with open(emgFile, "r") as f:
            return jsonify(json.load(f))
    except:
        return jsonify({"emgValues": []})

# =========================
# Main
# =========================
if __name__ == "__main__":
    threading.Thread(target=capture_pose, daemon=True).start()
    socketio.run(app, host="127.0.0.1", port=5000, debug=False)
