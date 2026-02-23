const app = document.getElementById("app");
const lastUpdate = document.getElementById("lastUpdate");
const searchInput = document.getElementById("search");
const autoBtn = document.getElementById("autoBtn");

let allConfigs = {};
let autoInterval = null;

/* لودینگ */
function showLoading() {
    app.innerHTML = "<p style='text-align:center'>⏳ در حال دریافت کانفیگ...</p>";
}

/* گرفتن کانفیگ */
async function fetchConfigs() {
    showLoading();

    try {
        const res = await fetch("https://raw.githubusercontent.com/barry-far/V2ray-Configs/main/All_Configs_Sub.txt");
        const text = await res.text();

        const lines = text.split("\n").filter(x => x.trim());

        allConfigs = {
            "🇩🇪 آلمان": [],
            "🇺🇸 آمریکا": []
        };

        lines.forEach(line => {
            if (line.includes("DE") || line.toLowerCase().includes("germany")) {
                allConfigs["🇩🇪 آلمان"].push(line);
            }
            if (line.includes("US") || line.toLowerCase().includes("united states")) {
                allConfigs["🇺🇸 آمریکا"].push(line);
            }
        });

        render(allConfigs);

        const now = new Date().toLocaleString("fa-IR");
        lastUpdate.innerText = "آخرین آپدیت: " + now;

    } catch (e) {
        app.innerHTML = "❌ خطا در دریافت دیتا";
    }
}

/* نمایش */
function render(data) {
    app.innerHTML = "";

    Object.keys(data).forEach(country => {
        if (data[country].length === 0) return;

        const box = document.createElement("div");
        box.className = "country-box";

        const title = document.createElement("h2");
        title.innerText = country + " (" + data[country].length + ")";
        box.appendChild(title);

        data[country].forEach(cfg => {
            const card = document.createElement("div");
            card.className = "card";

            const pre = document.createElement("pre");
            pre.innerText = cfg;

            const btn = document.createElement("button");
            btn.innerText = "📋 کپی";
            btn.onclick = () => copyConfig(cfg, btn);

            card.appendChild(pre);
            card.appendChild(btn);
            box.appendChild(card);
        });

        app.appendChild(box);
    });
}

/* کپی حرفه‌ای */
function copyConfig(text, btn) {
    navigator.clipboard.writeText(text);

    const old = btn.innerText;
    btn.innerText = "✅ کپی شد";
    btn.style.background = "green";

    setTimeout(() => {
        btn.innerText = old;
        btn.style.background = "";
    }, 1500);
}

/* سرچ */
searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();

    const filtered = {};

    Object.keys(allConfigs).forEach(country => {
        const match = allConfigs[country].filter(cfg =>
            cfg.toLowerCase().includes(value)
        );
        if (match.length > 0) {
            filtered[country] = match;
        }
    });

    render(filtered);
});

/* آپدیت دستی */
function manualUpdate() {
    fetchConfigs();
}

/* اتو آپدیت */
function toggleAuto() {
    if (autoInterval) {
        clearInterval(autoInterval);
        autoInterval = null;
        autoBtn.innerText = "🔴 Auto OFF";
    } else {
        autoInterval = setInterval(fetchConfigs, 30000);
        autoBtn.innerText = "🟢 Auto ON";
    }
}

/* شروع */
fetchConfigs();
