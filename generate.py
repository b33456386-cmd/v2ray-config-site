import requests
import json
from datetime import datetime

# سورس کانفیگ
URL = "https://raw.githubusercontent.com/mahdibland/V2RayAggregator/master/sub/sub_merge.txt"

# گرفتن دیتا
res = requests.get(URL)
lines = res.text.split("\n")

# تعریف کشورها
countries = {
    "USA": {
        "name": "آمریکا",
        "flag": "🇺🇸",
        "keywords": ["US", "USA", "United States"]
    },
    "Germany": {
        "name": "آلمان",
        "flag": "🇩🇪",
        "keywords": ["DE", "Germany"]
    }
}

# ساخت خروجی
result = {}

for key in countries:
    result[key] = {
        "name": countries[key]["name"],
        "flag": countries[key]["flag"],
        "configs": []
    }

# پردازش کانفیگ‌ها
for line in lines:
    line = line.strip()

    if not line:
        continue

    if not line.startswith("vless://") and not line.startswith("vmess://") and not line.startswith("trojan://"):
        continue

    for country_key, data in countries.items():
        for keyword in data["keywords"]:
            if keyword.lower() in line.lower():
                result[country_key]["configs"].append(line)
                break

# ساخت خروجی نهایی
output = {
    "last_update": datetime.utcnow().strftime("%Y-%m-%d %H:%M UTC"),
    "countries": []
}

for key, data in result.items():
    if len(data["configs"]) == 0:
        continue

    output["countries"].append({
        "name": data["name"],
        "flag": data["flag"],
        "count": len(data["configs"]),
        "configs": data["configs"][:100]  # محدود برای سرعت
    })

# ذخیره فایل
with open("configs.json", "w", encoding="utf-8") as f:
    json.dump(output, f, indent=2, ensure_ascii=False)
