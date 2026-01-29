import json
import time
import os
import matplotlib.pyplot as plt
import numpy as np

# ---------------------------
# Configuration
# ---------------------------
sampleRate = 20
displayWindowSeconds = 10

dataFolder = "data"
ecgFile = os.path.join(dataFolder, "ecgData.json")

# ---------------------------
# Plot setup
# ---------------------------
plt.ion()
figure, axis = plt.subplots()

axis.set_ylim(-0.6, 1.2)
axis.set_xlabel("Time (seconds)")
axis.set_ylabel("ECG Amplitude")
axis.set_title("ECG Plot (75 BPM)")
axis.grid(True)

currentSecond = 0
plottedLines = []

lastUpdateTime = 0

# ---------------------------
# Main loop (non-blocking)
# ---------------------------
while plt.fignum_exists(figure.number):
    currentTime = time.time()

    # Update once per second
    if currentTime - lastUpdateTime >= 1.0:
        lastUpdateTime = currentTime

        try:
            with open(ecgFile, "r") as file:
                data = json.load(file)

            ecgValues = data["ecgValues"]

            xValues = np.linspace(
                currentSecond,
                currentSecond + 1,
                len(ecgValues),
                endpoint=False
            )

            line, = axis.plot(xValues, ecgValues, color="blue", linewidth=2)
            plottedLines.append((currentSecond, line))

            windowStart = max(0, currentSecond - displayWindowSeconds + 1)
            windowEnd = windowStart + displayWindowSeconds

            axis.set_xlim(windowStart, windowEnd)
            axis.set_xticks(np.arange(windowStart, windowEnd + 1, 1))

            # Remove old lines safely
            while plottedLines and plottedLines[0][0] < windowStart:
                _, oldLine = plottedLines.pop(0)
                oldLine.remove()

            currentSecond += 1

        except (FileNotFoundError, json.JSONDecodeError):
            pass

    # Let matplotlib process GUI events
    plt.pause(0.05)
