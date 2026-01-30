import json
import time
import random
import math
import os

# ---------------------------
# Configuration
# ---------------------------
sampleRate = 20

baseActivityTime = 20     # seconds
baseRestTime = 7          # seconds

activityJitter = 10       # +/- seconds
restJitter = 7            # +/- seconds

dataFolder = "data"
emgFile = os.path.join(dataFolder, "emgData.json")
os.makedirs(dataFolder, exist_ok=True)

# ---------------------------
# State
# ---------------------------
mode = "activity"
timeLeft = 0

def newActivityPhase():
    return baseActivityTime + random.randint(-activityJitter, activityJitter)

def newRestPhase():
    return baseRestTime + random.randint(-restJitter, restJitter)

timeLeft = newActivityPhase()

# ---------------------------
# Simulator Loop
# ---------------------------
while True:
    emgValues = []

    if mode == "activity":
        # Simulate muscle bursts
        activation = random.uniform(0.4, 0.9)

        for _ in range(sampleRate):
            burst = random.choice([0, activation])
            noise = random.gauss(0, 0.08)
            emgValues.append(round(burst + noise, 4))
    else:
        # Rest: very low noise
        activation = random.uniform(0.02, 0.06)

        for _ in range(sampleRate):
            noise = random.gauss(0, 0.02)
            emgValues.append(round(noise, 4))

    # Write JSON
    with open(emgFile, "w") as file:
        json.dump({
            "samplingRate": sampleRate,
            "mode": mode,
            "emgValues": emgValues
        }, file)

    # Phase timing
    timeLeft -= 1
    if timeLeft <= 0:
        if mode == "activity":
            mode = "rest"
            timeLeft = newRestPhase()
        else:
            mode = "activity"
            timeLeft = newActivityPhase()

    time.sleep(1)
