from flask import Flask, jsonify, render_template
import json
import os

app = Flask(__name__)

dataFolder = "data"
ecgFile = os.path.join(dataFolder, "ecgData.json")
emgFile = os.path.join(dataFolder, "emgData.json")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/ecg")
def getEcg():
    try:
        with open(ecgFile, "r") as file:
            data = json.load(file)
        return jsonify(data)
    except:
        return jsonify({"ecgValues": []})

@app.route("/emg")
def getEmg():
    try:
        with open(emgFile, "r") as file:
            data = json.load(file)
        return jsonify(data)
    except:
        return jsonify({"emgValues": []})

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=False)
