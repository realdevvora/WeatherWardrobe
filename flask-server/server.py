from flask import Flask, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

@app.route("/userData/", methods=["GET"])
def userData():
    with open("dataset_areas.json", "r") as file:
        dataset = json.load(file)
    return jsonify(dataset)
    

if __name__ == "__main__":
    app.run(debug=True)