from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

# MongoDB Setup
client = MongoClient("mongodb://localhost:27017/")
db = client["attendanceDB"]
collection = db["records"]

@app.route('/api/attendance', methods=['POST', 'GET'])
def attendance_manager():
    if request.method == 'POST':
        data = request.json
        collection.insert_one({
            "name": data.get("name"),
            "usn": data.get("usn"),
            "gradeSection": data.get("gradeSection"),
            "status": data.get("status"),
            "date": data.get("date")
        })
        return jsonify({"message": "Attendance saved!"}), 201

    if request.method == 'GET':
        date_query = request.args.get('date')
        # Retrieve records for the specific date
        records = list(collection.find({"date": date_query}))
        
        # Format MongoDB documents for JSON
        for record in records:
            record["_id"] = str(record["_id"])
            
        return jsonify(records), 200

if __name__ == '__main__':
    app.run(debug=True)
