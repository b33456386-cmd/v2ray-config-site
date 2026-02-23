// ⏰ ساعت ایران
function updateTime(){
    const now = new Date();
    const iranTime = now.toLocaleString("fa-IR", {
        timeZone: "Asia/Tehran",
        hour: "2-digit",
        minute: "2-digit",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    });

    document.getElementById("lastUpdate").innerText =
        "آخرین آپدیت: " + iranTime + " ⏰";
}

// دیتا
let data = {};
let autoInterval = null;

// 🔥 گرفتن دیتا (نسخه بدون خطا)
async function fetchConfigs(){
    try{
        const res = await fetch("generate.json?" + Date.now());

        if(!res.ok) throw new Error("fetch error");

        const json = await res.json();

        data = {};

        json.forEach(cfg=>{
            let country = "نامشخص 🌍";

            if(cfg.includes("US") || cfg.includes("America"))
                country = "آمریکا 🇺🇸";
            else if(cfg.includes("DE") || cfg.includes("Germany"))
                country = "آلمان 🇩🇪";

            if(!data[country]) data[country] = [];
            data[country].push(cfg);
        });

        loadConfigs();
        updateTime();

    }catch(e){
        console.log(e);

        // ❗ fallback (که صفحه سفید نشه)
        data = {
            "آمریکا 🇺🇸": ["sample-config-us"],
            "آلمان 🇩🇪": ["sample-config-de"]
        };

        loadConfigs();

        document.getElementById("lastUpdate").innerText =
            "خطا در دریافت ❌ (نمایش تست)";
    }
}

// نمایش کشورها
function loadConfigs(){
    const app = document.getElementById("app");
    app.innerHTML = "";

    for(let country in data){
        let div = document.createElement("div");
        div.className = "country";
        div.innerText = `${country} (${data[country].length})`;

        div.onclick = ()=>{
            showConfigs(country);
        };

        app.appendChild(div);
    }
}

// نمایش کانفیگ‌ها
function showConfigs(country){
    const app = document.getElementById("app");
    app.innerHTML = `<h2>${country}</h2>`;

    data[country].forEach(cfg=>{
        let box = document.createElement("div");
        box.className = "configBox";

        box.innerHTML = `
        <p style="word-break: break-all;">${cfg}</p>
        <button onclick="copyConfig(\`${cfg}\`)">📋 کپی</button>
        `;

        app.appendChild(box);
    });

    let back = document.createElement("button");
    back.innerText = "🔙 بازگشت";
    back.onclick = loadConfigs;
    app.appendChild(back);
}

// کپی
function copyConfig(text){
    navigator.clipboard.writeText(text);
    alert("کپی شد ✅");
}

// 🔍 سرچ
document.getElementById("search").addEventListener("input", function(){
    const value = this.value.toLowerCase();

    const app = document.getElementById("app");
    app.innerHTML = "";

    for(let country in data){
        if(country.toLowerCase().includes(value)){
            let div = document.createElement("div");
            div.className = "country";
            div.innerText = `${country} (${data[country].length})`;
            div.onclick = ()=> showConfigs(country);
            app.appendChild(div);
        }
    }
});

// 🔄 آپدیت دستی
function manualUpdate(){
    fetchConfigs();
}

// 🤖 اتو آپدیت
function toggleAuto(){
    const btn = document.getElementById("autoBtn");

    if(autoInterval){
        clearInterval(autoInterval);
        autoInterval = null;
        btn.innerText = "🔴 Auto OFF";
    }else{
        autoInterval = setInterval(fetchConfigs, 15000);
        btn.innerText = "🟢 Auto ON";
    }
}

// اجرای اولیه
fetchConfigs();
updateTime();
