import requests
import json
from datetime import datetime

URL = "https://raw.githubusercontent.com/mahdibland/V2RayAggregator/master/sub/sub_merge.txt"

res = requests.get(URL)
lines = res.text.split("\n")

countries = {
    "Germany": [],
    "USA": []
}

for line in lines:
    if not line.strip():
        continue

    text = line.lower()

    if "de" in text:
        countries["Germany"].append(line)

    elif "us" in text:
        countries["USA"].append(line)

output = {
    "last_update": datetime.now().strftime("%Y-%m-%d %H:%M"),
    "countries": [
        {
            "name": "آلمان",
            "flag": "🇩🇪",
            "configs": countries["Germany"]
        },
        {
            "name": "آمریکا",
            "flag": "🇺🇸",
            "configs": countries["USA"]
        }
    ]
}

with open("data.json", "w") as f:
    json.dump(output, f, indent=2)
