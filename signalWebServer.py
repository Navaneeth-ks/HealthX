from flask import Flask, jsonify, render_template, request
from flask_socketio import SocketIO
import json
import os
import cv2
import mediapipe as mp
import threading
import time

# ================= RESULTS STORAGE =================

results_time = []
results_reps = []

workout_active = True
workout_start_time = time.time()

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

# =========================
# POSE CAPTURE LOOP
# =========================
def capture_pose():
    global workout_active, workout_start_time
    reset_workout_state()
    workout_start_time = time.time()

    while workout_active:
        ret, frame = cap.read()

        # ⛔ stop cleanly when video ends
        if not ret:
            workout_active = False
            break

        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = pose.process(rgb)

        if results.pose_world_landmarks:
            landmarks = [
                {"x": lm.x, "y": lm.y, "z": lm.z}
                for lm in results.pose_world_landmarks.landmark
            ]

            socketio.emit("pose", landmarks)

            # Read latest workout state written by frontend
            try:
                with open(RESPONSE_FILE, "r") as f:
                    resp = json.load(f)
            except:
                continue

            reps = resp.get("reps", 0)
            elapsed = round(time.time() - workout_start_time, 2)

            results_time.append(elapsed)
            results_reps.append(reps)


def reset_workout_state():
    global results_time, results_accuracy, results_reps, workout_start_time

    results_time.clear()
    results_reps.clear()
    workout_start_time = time.time()

    # reset responseData.json safely
    with open(RESPONSE_FILE, "w") as f:
        json.dump({
            "reps": 0,
            "angles": {},
            "angle_status": {},
            "bad_counts": {}
        }, f, indent=2)


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
        with open(RESPONSE_FILE, "w") as f:
            json.dump(request.json, f, indent=2)
        return jsonify({"status": "ok"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route("/ai_feedback")
def ai_feedback():
    return jsonify(ai_response_cache)

@app.route("/loading")
def loading():
    return render_template("loading.html")

@app.route("/results")
def results():
    return render_template("results.html")

# ✅ SINGLE, CORRECT RESULTS ENDPOINT
@app.route("/results_data")
def results_data():
    try:
        with open(RESPONSE_FILE, "r") as f:
            data = json.load(f)
    except:
        data = {}

    bad_counts = data.get("bad_counts", {})
    total_frames = max(len(results_time), 1)  # prevent divide-by-zero

    # 🔹 normalize errors to percentage
    joint_errors = {
        joint: round((count / total_frames) * 100, 2)
        for joint, count in bad_counts.items()
    }

    return jsonify({
        "time": results_time,
        "reps": results_reps,
        "joint_errors": joint_errors
    })


@app.route("/stop_workout", methods=["POST"])
def stop_workout():
    global workout_active
    workout_active = False
    return "", 204

# =========================
# MAIN
# =========================
if __name__ == "__main__":
    threading.Thread(target=capture_pose, daemon=True).start()
    threading.Thread(target=ai_feedback_loop, daemon=True).start()

    socketio.run(app, host="127.0.0.1", port=5000, debug=False)
