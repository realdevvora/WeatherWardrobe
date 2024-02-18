import os
from flask import Flask, jsonify, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

from openai import OpenAI
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

@app.route("/userData/", methods=["GET"])
def userData():
    with open("dataset_areas.json", "r") as file:
        dataset = json.load(file)
    return jsonify(dataset)

@app.route("/obtainSuggestions/", methods=["POST"])
def suggestions():
    data = dict(request.get_json())
    print(data)

    if data['weather']['hasPrecipitation']:
        phrase = f"The weather is {data['weather']['weatherDescription']}, with a temperature in celsius of {data['weather']['weatherTemperature']} with precipitation in {data['location']}. What are at most 10 things that I could consider wearing to dress according to this weather? Please provide them in a checklist format."
    else:
        phrase = f"The weather is {data['weather']['weatherDescription']}, with a temperature in celsius of {data['weather']['weatherTemperature']} with no precipitation in {data['location']}. What are at most 10 things that I could consider wearing to dress according to this weather? Please provide them in a checklist format."


    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": phrase},  # Assuming data is the user's input
        ]
    )

    return jsonify({"message": response.choices[0].message.content}), 200
    

if __name__ == "__main__":
    app.run(debug=True)