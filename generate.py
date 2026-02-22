import requests
import json
from datetime import datetime

# سورس کانفیگ (می‌تونی بعدا عوض کنی)
URL = "https://raw.githubusercontent.com/mahdibland/V2RayAggregator/master/sub/sub_merge.txt"

res = requests.get(URL)
lines = res.text.split("\n")

countries = {}

def get_country(ip):
    try:
        r = requests.get(f"http://ip-api.com/json/{ip}")
        data = r.json()
        return data.get("country", "Unknown")
    except:
        return "Unknown"

for line in lines:
    if "@" in line:
        try:
            ip = line.split("@")[1].split(":")[0]
            country = get_country(ip)

            if country not in countries:
                countries[country] = []

            countries[country].append(line)
        except:
            pass

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
