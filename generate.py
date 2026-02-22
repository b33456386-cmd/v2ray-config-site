import requests
import json
from datetime import datetime
import re

# سورس گیت‌هاب
GITHUB_URL = "https://raw.githubusercontent.com/mahdibland/V2RayAggregator/master/sub/sub_merge.txt"

# کانال‌های معروف تلگرام
TELEGRAM_CHANNELS = [
    "https://t.me/s/v2rayng_fast",
    "https://t.me/s/v2ray_configs_pool",
    "https://t.me/s/freev2rays",
    "https://t.me/s/vmess_protocol",
]

all_lines = []

# گرفتن از گیت‌هاب
try:
    res = requests.get(GITHUB_URL, timeout=20)
    all_lines += res.text.split("\n")
except:
    print("GitHub error")

# گرفتن از تلگرام
for url in TELEGRAM_CHANNELS:
    try:
        res = requests.get(url, timeout=20)
        html = res.text

        configs = re.findall(r'(vmess://[^\s<"]+|vless://[^\s<"]+)', html)
        all_lines += configs

    except:
        print("Telegram error:", url)

# کشورها (فقط ۲ تا)
countries = {
    "آلمان": {
        "flag": "🇩🇪",
        "keywords": ["de", "germany"]
    },
    "آمریکا": {
        "flag": "🇺🇸",
        "keywords": ["us", "usa", "america"]
    }
}

result = {
    "آلمان": [],
    "آمریکا": []
}

# پردازش
for line in all_lines:
    line = line.strip()

    if not (line.startswith("vmess://") or line.startswith("vless://")):
        continue

    lower = line.lower()

    if any(k in lower for k in countries["آلمان"]["keywords"]):
        result["آلمان"].append(line)

    elif any(k in lower for k in countries["آمریکا"]["keywords"]):
        result["آمریکا"].append(line)

# حذف تکراری‌ها
for k in result:
    result[k] = list(set(result[k]))

# خروجی
output = {
    "last_update": datetime.now().strftime("%Y-%m-%d %H:%M"),
    "countries": []
}

for name, configs in result.items():
    if len(configs) == 0:
        continue

    output["countries"].append({
        "name": name,
        "flag": countries[name]["flag"],
        "configs": configs[:150]
    })

# ذخیره
with open("data.json", "w", encoding="utf-8") as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

print("OK ✅ Multi-source فعال شد")
