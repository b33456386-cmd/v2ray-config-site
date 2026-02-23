let allConfigs = [];
let autoInterval = null;

const API_URL = "generate.json"; // اگر لینک داری جایگزین کن

async function fetchData() {
    try {
        const res = await fetch(API_URL + "?t=" + Date.now());
        const data = await res.json();

        allConfigs = data;

        render(data);
        updateTime();

    } catch (e) {
        document.getElementById("usList").innerHTML = "❌ خطا";
        document.getElementById("deList").innerHTML = "";
    }
}

function render(list) {

    let us = [];
    let de = [];

    list.forEach(item => {

        const text = JSON.stringify(item).toLowerCase();

        if (text.includes("united") || text.includes("us")) {
            us.push(item);
        } else if (text.includes("germany")) {
            de.push(item);
        }
    });

    renderList("usList", us);
    renderList("deList", de);

    document.getElementById("usCount").innerText = us.length;
    document.getElementById("deCount").innerText = de.length;
}

function renderList(id, list) {
    const el = document.getElementById(id);
    el.innerHTML = "";

    list.forEach(i => {
        const config = i.config || i || "";

        el.innerHTML += `
        <div class="card">
            <pre>${config}</pre>
            <button onclick="copyText(\`${config}\`)">کپی</button>
        </div>
        `;
    });
}

function copyText(text) {
    navigator.clipboard.writeText(text);
    alert("کپی شد ✅");
}

function updateTime() {
    const now = new Date().toLocaleString("fa-IR", {
        timeZone: "Asia/Tehran"
    });

    document.getElementById("lastUpdate").innerText =
        "آخرین آپدیت: " + now;
}

function manualUpdate() {
    fetchData();
}

function toggleAuto() {
    const btn = document.getElementById("autoBtn");

    if (autoInterval) {
        clearInterval(autoInterval);
        autoInterval = null;
        btn.innerText = "🔴 Auto OFF";
    } else {
        autoInterval = setInterval(fetchData, 10000);
        btn.innerText = "🟢 Auto ON";
    }
}

// سرچ
document.getElementById("search").addEventListener("input", e => {
    const val = e.target.value.toLowerCase();

    const filtered = allConfigs.filter(i =>
        JSON.stringify(i).toLowerCase().includes(val)
    );

    render(filtered);
});

fetchData();
