import json
import time
import math
import random
import os

# ---------------------------
# Configuration
# ---------------------------
sampleRate = 20                 # samples per second
initialHeartRate = 65           # BPM (can be set to 0)

dataFolder = "data"
ecgFile = os.path.join(dataFolder, "ecgData.json")
os.makedirs(dataFolder, exist_ok=True)

# ---------------------------
# Heart-rate state
# ---------------------------
currentHeartRate = initialHeartRate
nextBeatTime = None             # None means no scheduled beat

# ---------------------------
# PQRST waveform
# ---------------------------
def pqrstWaveform(dt):
    def gaussian(x, mu, sigma, amp):
        return amp * math.exp(-((x - mu) ** 2) / (2 * sigma ** 2))

    p = gaussian(dt, -0.20, 0.035,  0.12)
    q = gaussian(dt, -0.05, 0.010, -0.15)
    r = gaussian(dt,  0.00, 0.008,  1.00)
    s = gaussian(dt,  0.03, 0.012, -0.25)
    t = gaussian(dt,  0.30, 0.060,  0.35)

    return p + q + r + s + t

# ---------------------------
# Noise
# ---------------------------
def addNoise(value, t):
    baseline = 0.04 * math.sin(2 * math.pi * 0.3 * t)
    muscle = random.uniform(-0.015, 0.015)
    sensor = random.gauss(0, 0.008)
    return value + baseline + muscle + sensor

# ---------------------------
# Simulator
# ---------------------------
def simulateEcg():
    global nextBeatTime

    currentTime = 0.0
    activeBeats = []

    while True:
        ecgValues = []

        for _ in range(sampleRate):
            value = 0.0

            # ---------------------------
            # Heartbeat scheduling
            # ---------------------------
            if currentHeartRate > 0:
                if nextBeatTime is None:
                    nextBeatTime = currentTime

                if currentTime >= nextBeatTime:
                    activeBeats.append(currentTime)
                    rrInterval = 60.0 / currentHeartRate
                    nextBeatTime += rrInterval
            else:
                # HR = 0 → no beats
                nextBeatTime = None
                activeBeats.clear()

            # ---------------------------
            # Sum active beats
            # ---------------------------
            for beatTime in activeBeats[:]:
                dt = currentTime - beatTime
                if -0.3 <= dt <= 0.6:
                    value += pqrstWaveform(dt)
                else:
                    activeBeats.remove(beatTime)

            if currentHeartRate > 0:
                value = addNoise(value, currentTime)

            ecgValues.append(round(value, 4))
            currentTime += 1.0 / sampleRate

        data = {
            "samplingRate": sampleRate,
            "heartRate": currentHeartRate,
            "ecgValues": ecgValues
        }

        with open(ecgFile, "w") as file:
            json.dump(data, file)

        time.sleep(1)

if __name__ == "__main__":
    simulateEcg()