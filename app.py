from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb://localhost:27017/")
db = client["attendanceDB"]
collection = db["records"]


@app.route('/api/attendance', methods=['POST'])
def add_attendance():
    data = request.json

    collection.insert_one({
        "name": data.get("name"),
        "usn": data.get("usn"),              # Added USN
        "gradeSection": data.get("gradeSection"), # Added Grade/Section
        "status": data.get("status"),
        "date": data.get("date")
    })

    return jsonify({"message": "Attendance saved!"})

if __name__ == '__main__':
    app.run(debug=True)
