import requests
import json
from datetime import datetime

URL = "https://raw.githubusercontent.com/mahdibland/V2RayAggregator/master/sub/sub_merge.txt"

res = requests.get(URL)
lines = res.text.split("\n")

countries = {}

for line in lines[:50]:  # محدود برای سرعت
    if line.strip() == "":
        continue

    country = "Unknown"

    if country not in countries:
        countries[country] = []

    countries[country].append(line)

output = {
    "last_update": str(datetime.now()),
    "countries": []
}

for c in countries:
    output["countries"].append({
        "name": c,
        "flag": "🌍",
        "configs": countries[c][:10]
    })

with open("data.json", "w") as f:
    json.dump(output, f, indent=2)
