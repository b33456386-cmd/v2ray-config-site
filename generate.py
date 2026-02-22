import requests
import json
from datetime import datetime

URL = "https://raw.githubusercontent.com/mahdibland/V2RayAggregator/master/sub/sub_merge.txt"

res = requests.get(URL)
lines = res.text.split("\n")

countries = {}

def guess_country(text):
    text = text.lower()
    if "de" in text:
        return "Germany 🇩🇪"
    elif "us" in text:
        return "USA 🇺🇸"
    elif "fr" in text:
        return "France 🇫🇷"
    elif "tr" in text:
        return "Turkey 🇹🇷"
    else:
        return "Other 🌍"

for line in lines[:50]:
    if line.strip() == "":
        continue

    country = guess_country(line)

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
        "flag": "",
        "configs": countries[c][:10]
    })

with open("data.json", "w") as f:
    json.dump(output, f, indent=2)
