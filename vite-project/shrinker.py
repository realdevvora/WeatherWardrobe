import json

# Load the dataset from dataset.json
with open("dataset.json", "r") as file:
    dataset = json.load(file)

unique_cities = set()  # To store unique cities
shrunken_data = []

for item in dataset:
    city = item["city"]
    print(city)
    if city not in unique_cities:
        unique_cities.add(city)
        shrunken_data.append(item)

with open("city_country_dataset.json", "w") as f:
    json.dump(shrunken_data, f, indent=4)

print("Data has been written to city_country_dataset.json")