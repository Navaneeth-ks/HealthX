import json
import time
import os
import numpy as np

# ---------------------------
# Configuration
# ---------------------------
dataFolder = "data"
ecgFile = os.path.join(dataFolder, "ecgData.json")

sampleRate = 20
observationSeconds = 60
minRrInterval = 0.4     # seconds (max 150 BPM)
maxRrInterval = 1.5     # seconds (min 40 BPM)

# ---------------------------
# R-peak detection
# ---------------------------
def detectRPeaks(signal, threshold=0.5):
    """
    Simple R-peak detector:
    - local maximum
    - above amplitude threshold
    """
    peaks = []

    for i in range(1, len(signal) - 1):
        if (
            signal[i] > threshold and
            signal[i] > signal[i - 1] and
            signal[i] > signal[i + 1]
        ):
            peaks.append(i)

    return peaks

# ---------------------------
# Main HR calculation
# ---------------------------
def calculateHeartRate():
    ecgBuffer = []
    startTime = time.time()

    print("Collecting ECG data for 60 seconds...")

    while time.time() - startTime < observationSeconds:
        try:
            with open(ecgFile, "r") as file:
                data = json.load(file)

            ecgValues = data["ecgValues"]
            ecgBuffer.extend(ecgValues)

            time.sleep(1)

        except (FileNotFoundError, json.JSONDecodeError):
            time.sleep(0.1)

    ecgSignal = np.array(ecgBuffer)

    # Flatline check
    if np.max(np.abs(ecgSignal)) < 0.1:
        print("Detected flatline (HR = 0 BPM)")
        return 0

    # R-peak detection
    rPeaks = detectRPeaks(ecgSignal)

    if len(rPeaks) < 2:
        print("Not enough R-peaks detected")
        return 0

    # Convert peak indices to RR intervals
    rrIntervals = np.diff(rPeaks) / sampleRate

    # Physiological filtering
    rrIntervals = [
        rr for rr in rrIntervals
        if minRrInterval <= rr <= maxRrInterval
    ]

    if not rrIntervals:
        print("No valid RR intervals found")
        return 0

    averageRr = np.mean(rrIntervals)
    heartRate = 60.0 / averageRr

    print(f"Estimated Heart Rate: {heartRate:.1f} BPM")
    return heartRate

# ---------------------------
# Entry point
# ---------------------------
if __name__ == "__main__":
    calculateHeartRate()
