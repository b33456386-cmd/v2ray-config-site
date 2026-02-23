let auto = false;
let interval;

const API = "https://raw.githubusercontent.com/2raycrow/v2ray-configs/main/generate.json";

async function fetchData() {
    try {
        const res = await fetch(API + "?t=" + Date.now());
        const data = await res.json();

        document.getElementById("lastUpdate").innerText =
            "آخرین آپدیت: " + new Date().toLocaleString("fa-IR");

        render(data);
    } catch (e) {
        document.getElementById("lastUpdate").innerHTML =
            "❌ خطا در دریافت";
    }
}

function render(data) {
    const app = document.getElementById("app");
    app.innerHTML = "";

    let grouped = {};

    data.forEach(item => {
        let country = item.country || "نامشخص";

        if (!grouped[country]) grouped[country] = [];
        grouped[country].push(item);
    });

    Object.keys(grouped).forEach(country => {
        let div = document.createElement("div");
        div.className = "card";
        div.innerText = country + " (" + grouped[country].length + ")";
        app.appendChild(div);
    });
}

function manualUpdate() {
    fetchData();
}

function toggleAuto() {
    auto = !auto;
    const btn = document.getElementById("autoBtn");

    if (auto) {
        btn.innerText = "🟢 Auto ON";
        interval = setInterval(fetchData, 10000);
    } else {
        btn.innerText = "🔴 Auto OFF";
        clearInterval(interval);
    }
}

document.getElementById("search").addEventListener("input", function () {
    let val = this.value.toLowerCase();
    let cards = document.querySelectorAll(".card");

    cards.forEach(c => {
        c.style.display = c.innerText.toLowerCase().includes(val)
            ? "block"
            : "none";
    });
});

// اجرا در شروع
fetchData();
