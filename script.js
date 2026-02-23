let auto = false;
let interval;

async function fetchConfigs() {
    try {
        const res = await fetch("https://raw.githubusercontent.com/V2RAYCONFIGSPOOL/V2RAY_SUB/main/v2ray_configs.txt");
        const text = await res.text();

        const configs = text.split("\n").filter(x => x.trim() !== "");

        render(configs);

        document.getElementById("lastUpdate").innerText =
            "آخرین آپدیت: " + new Date().toLocaleString("fa-IR");

    } catch (e) {
        document.getElementById("app").innerHTML = "❌ خطا در دریافت دیتا";
    }
}

function render(list) {
    const app = document.getElementById("app");
    app.innerHTML = "";

    list.slice(0, 50).forEach(cfg => {
        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <div>🌍 کانفیگ</div>
            <div class="config">${cfg}</div>
        `;

        app.appendChild(div);
    });
}

function manualUpdate() {
    fetchConfigs();
}

function toggleAuto() {
    auto = !auto;
    const btn = document.getElementById("autoBtn");

    if (auto) {
        btn.innerText = "🟢 Auto ON";
        btn.style.background = "green";

        interval = setInterval(fetchConfigs, 10000);
    } else {
        btn.innerText = "🔴 Auto OFF";
        btn.style.background = "red";

        clearInterval(interval);
    }
}

fetchConfigs();
