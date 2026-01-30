from flask import Flask, jsonify, render_template
import json
import os

app = Flask(__name__)

dataFolder = "data"
emgFile = os.path.join(dataFolder, "emgData.json")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/emg")
def getEmg():
    try:
        with open(emgFile, "r") as file:
            data = json.load(file)
        return jsonify(data)
    except:
        return jsonify({"emgValues": []})

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5001, debug=False)
