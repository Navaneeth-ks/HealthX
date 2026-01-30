import cv2
import mediapipe as mp
from flask import Flask
from flask_socketio import SocketIO
import time
import threading

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

mp_pose = mp.solutions.pose
pose = mp_pose.Pose(
    model_complexity=1,
    smooth_landmarks=False,
    min_detection_confidence=0.6,
    min_tracking_confidence=0.6
)

cap = cv2.VideoCapture("input_vid.mp4")

video_fps = cap.get(cv2.CAP_PROP_FPS)
if video_fps <= 0:
    video_fps = 30

frame_interval = 1.0 / video_fps
print(f"[INFO] Video FPS: {video_fps}")

def capture_pose():
    last_emit_time = 0

    while True:
        loop_start = time.time()

        ret, frame = cap.read()
        if not ret:
            break

        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = pose.process(rgb)

        now = time.time()
        if results.pose_world_landmarks and (now - last_emit_time) >= frame_interval:
            landmarks = [
                {"x": lm.x, "y": lm.y, "z": lm.z}
                for lm in results.pose_world_landmarks.landmark
            ]
            socketio.emit("pose", landmarks)
            last_emit_time = now

        processing_time = time.time() - loop_start
        if processing_time < frame_interval:
            time.sleep(frame_interval - processing_time)

    cap.release()
    socketio.emit("pose", "END")

@app.route("/")
def index():
    return "Pose server running"

if __name__ == "__main__":
    threading.Thread(target=capture_pose, daemon=True).start()
    socketio.run(app, host="0.0.0.0", port=5000)
