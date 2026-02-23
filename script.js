const app = document.getElementById("app");
const lastUpdate = document.getElementById("lastUpdate");
const searchInput = document.getElementById("search");
const autoBtn = document.getElementById("autoBtn");

let configs = { de: [], us: [] };
let currentTab = "de";
let autoInterval = null;

function showLoading() {
    app.innerHTML = "⏳ در حال دریافت...";
}

async function fetchConfigs() {
    showLoading();

    try {
        const res = await fetch("https://raw.githubusercontent.com/barry-far/V2ray-Configs/main/All_Configs_Sub.txt");
        const text = await res.text();

        const lines = text.split("\n").filter(x => x.trim());

        configs = { de: [], us: [] };

        lines.forEach(line => {
            if (line.includes("DE") || line.toLowerCase().includes("germany")) {
                configs.de.push(line);
            }
            if (line.includes("US") || line.toLowerCase().includes("united states")) {
                configs.us.push(line);
            }
        });

        render();

        lastUpdate.innerText = "آخرین آپدیت: " + new Date().toLocaleString("fa-IR");

    } catch {
        app.innerHTML = "❌ خطا";
    }
}

function render() {
    app.innerHTML = "";

    let list = configs[currentTab];

    const search = searchInput.value.toLowerCase();
    list = list.filter(x => x.toLowerCase().includes(search));

    list.forEach(cfg => {
        const card = document.createElement("div");
        card.className = "card";

        const pre = document.createElement("pre");
        pre.innerText = cfg;

        const btn = document.createElement("button");
        btn.innerText = "📋";
        btn.onclick = () => copy(cfg, btn);

        card.appendChild(pre);
        card.appendChild(btn);

        app.appendChild(card);
    });
}

function switchTab(tab) {
    currentTab = tab;

    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    event.target.classList.add("active");

    render();
}

function copy(text, btn) {
    navigator.clipboard.writeText(text);

    btn.innerText = "✅";
    setTimeout(() => btn.innerText = "📋", 1000);
}

function copyAll() {
    const list = configs[currentTab].join("\n");
    navigator.clipboard.writeText(list);
    alert("همه کپی شد 😎");
}

searchInput.addEventListener("input", render);

function manualUpdate() {
    fetchConfigs();
}

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

fetchConfigs();
