import cv2
import mediapipe as mp
from flask import Flask, render_template
from flask_socketio import SocketIO
import threading

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

mp_pose = mp.solutions.pose
pose = mp_pose.Pose(
    model_complexity=2,
    min_detection_confidence=0.5
)

cap = cv2.VideoCapture(0)

def capture_pose():
    while True:
        ret, frame = cap.read()
        if not ret:
            continue

        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = pose.process(rgb)

        if results.pose_world_landmarks:
            landmarks = []
            for lm in results.pose_world_landmarks.landmark:
                landmarks.append({
                    "x": lm.x,
                    "y": lm.y,
                    "z": lm.z
                })

            socketio.emit("pose_data", landmarks)

@app.route("/")
def index():
    return "Server running"

if __name__ == "__main__":
    threading.Thread(target=capture_pose, daemon=True).start()
    socketio.run(app, host="0.0.0.0", port=5000)
