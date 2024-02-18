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
        phrase = f"The weather is {data['weather']['weatherDescription']}, with a temperature in celsius of {data['weather']['weatherTemperature']} with precipitation in {data['location']}. First, provide a short list of appropriate clothing according to the weather using the data provided, and list approximately 5 clothing items or accessories (list in a list format). Then, provide a fun fact regarding what people generally find interesting about the weather, which is another approximately 50 words. Finally, briefly describe what kind of weather conditions can be concluded from the data provided, in approximately 50 words. Remember to make each section of this answer stand out. The first section title should be What to Wear/Have, then Fun Fact about Weather, then More About Today's Weather."
    else:
        phrase = f"The weather is {data['weather']['weatherDescription']}, with a temperature in celsius of {data['weather']['weatherTemperature']} with no precipitation in {data['location']}. First, provide a short list of appropriate clothing according to the weather using the data provided, and list approximately 5 clothing items or accessories (list in a list format). Then, provide a fun fact regarding what people generally find interesting about the weather, which is another approximately 50 words. Finally, briefly describe what kind of weather conditions can be concluded from the data provided, in approximately 50 words. Remember to make each section of this answer stand out. The first section title should be What to Wear/Have, then Fun Fact about Weather, then More About Today's Weather."


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