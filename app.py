"""
ARC REACTOR ALARM CLOCK — Flask Backend
========================================
Run:  pip install flask
Then: python app.py
Open: http://localhost:5000
"""

from flask import Flask, render_template, request, jsonify
import json, os, threading, time
from datetime import datetime

app = Flask(__name__)

# ── Alarm storage (JSON file acts as DB) ─────────────────────
ALARM_FILE = "alarms.json"

def load_alarms():
    if os.path.exists(ALARM_FILE):
        with open(ALARM_FILE) as f:
            return json.load(f)
    return []

def save_alarms(alarms):
    with open(ALARM_FILE, "w") as f:
        json.dump(alarms, f, indent=2)

# ── Routes ────────────────────────────────────────────────────

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/alarms", methods=["GET"])
def get_alarms():
    return jsonify(load_alarms())

@app.route("/api/alarms", methods=["POST"])
def create_alarm():
    data = request.get_json()
    alarms = load_alarms()
    alarm = {
        "id": int(time.time() * 1000),   # unique ms timestamp
        "time": data.get("time"),          # "HH:MM"
        "label": data.get("label", "STARK PROTOCOL"),
        "days": data.get("days", []),      # ["Mon","Tue",...]
        "enabled": True,
        "sound": data.get("sound", "arc"), # arc | jarvis | repulsor
        "timezone": data.get("timezone", "UTC"),
        "created": datetime.now().isoformat()
    }
    alarms.append(alarm)
    save_alarms(alarms)
    return jsonify({"success": True, "alarm": alarm})

@app.route("/api/alarms/<int:alarm_id>", methods=["PATCH"])
def toggle_alarm(alarm_id):
    alarms = load_alarms()
    for a in alarms:
        if a["id"] == alarm_id:
            a["enabled"] = not a["enabled"]
            break
    save_alarms(alarms)
    return jsonify({"success": True})

@app.route("/api/alarms/<int:alarm_id>", methods=["DELETE"])
def delete_alarm(alarm_id):
    alarms = load_alarms()
    alarms = [a for a in alarms if a["id"] != alarm_id]
    save_alarms(alarms)
    return jsonify({"success": True})

@app.route("/api/time", methods=["GET"])
def server_time():
    """Return current server UTC time."""
    now = datetime.utcnow()
    return jsonify({
        "utc": now.strftime("%H:%M:%S"),
        "iso": now.isoformat()
    })

if __name__ == "__main__":
    print("ARC REACTOR CLOCK — Online")
    print("http://localhost:5000")
    app.run(debug=True, port=5000)
