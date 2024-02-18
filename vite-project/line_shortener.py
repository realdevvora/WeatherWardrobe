import json

# Load the dataset from dataset.json
with open("city_country_dataset.json", "r") as file:
    dataset = json.load(file)

# Merge the columns into a single one
merged_data = []
for entry in dataset:
    if entry['country'] == "Canada":
        merged_entry = {
            "merged_column": f"{entry['city']}, {entry['state']}, {entry['country']}"
        }
        merged_data.append(merged_entry)

# Write the merged data to a new JSON file
with open("dataset_areas.json", "w") as outfile:
    json.dump(merged_data, outfile, indent=4)
