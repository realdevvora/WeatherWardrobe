import json

# Load the dataset from dataset.json
with open("dataset.json", "r") as file:
    dataset = json.load(file)

# # Merge the columns into a single one
# merged_data = []
# for entry in dataset:
#     merged_entry = {
#         "merged_column": f"{entry['city']}, {entry['state']}, {entry['country']}, {entry['zipCode']}"
#     }
#     merged_data.append(merged_entry)


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

# # Write the merged data to a new JSON file
# with open("dataset_areas.json", "w") as outfile:
#     json.dump(merged_data, outfile, indent=4)
