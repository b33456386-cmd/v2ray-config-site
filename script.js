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

let data = {};
let autoUpdate = false;
let interval;

// گرفتن دیتا
async function fetchConfigs(){
    try{
        const res = await fetch("generate.json?" + new Date().getTime());
        const json = await res.json();

        data = {};

        json.forEach(cfg=>{
            let country = "نامشخص";

            if(cfg.includes("US") || cfg.includes("America"))
                country = "آمریکا 🇺🇸";
            else if(cfg.includes("DE") || cfg.includes("Germany"))
                country = "آلمان 🇩🇪";

            if(!data[country]) data[country] = [];
            data[country].push(cfg);
        });

        updateTime();
        loadConfigs();

    }catch(e){
        document.getElementById("app").innerHTML = "خطا در دریافت ❌";
    }
}

// نمایش کشورها
function loadConfigs(){
    const app = document.getElementById("app");
    app.innerHTML = "";

    for(let country in data){
        let div = document.createElement("div");
        div.className = "country fadeIn";
        div.innerText = country + " (" + data[country].length + ")";

        div.onclick = ()=>{
            showConfigs(country);
        };

        app.appendChild(div);
    }
}

// نمایش کانفیگ‌ها
function showConfigs(country){
    const app = document.getElementById("app");
    app.innerHTML = `
        <div class="topBar">
            <button onclick="loadConfigs()">🔙</button>
            <input id="innerSearch" placeholder="🔍 جستجو داخل کانفیگ">
        </div>
        <h2>${country}</h2>
    `;

    data[country].forEach(cfg=>{
        createConfigBox(cfg, app);
    });

    // سرچ داخل کشور
    document.getElementById("innerSearch").addEventListener("input", function(){
        const val = this.value.toLowerCase();
        app.querySelectorAll(".configBox").forEach(box=>{
            box.style.display = box.innerText.toLowerCase().includes(val)
                ? "block" : "none";
        });
    });
}

// ساخت باکس
function createConfigBox(cfg, app){
    let box = document.createElement("div");
    box.className = "configBox fadeIn";

    box.innerHTML = `
        <p>${cfg}</p>
        <button onclick="copyConfig(\`${cfg}\`)">📋 کپی</button>
    `;

    app.appendChild(box);
}

// کپی
function copyConfig(text){
    navigator.clipboard.writeText(text);
    alert("کپی شد ✅");
}

// سرچ کشور
document.getElementById("search").addEventListener("input", function(){
    const value = this.value.toLowerCase();
    const app = document.getElementById("app");
    app.innerHTML = "";

    for(let country in data){
        if(country.toLowerCase().includes(value)){
            let div = document.createElement("div");
            div.className = "country";
            div.innerText = country + " (" + data[country].length + ")";
            div.onclick = ()=> showConfigs(country);
            app.appendChild(div);
        }
    }
});

// دکمه آپدیت
function manualUpdate(){
    fetchConfigs();
}

// Auto Update
function toggleAuto(){
    autoUpdate = !autoUpdate;

    const btn = document.getElementById("autoBtn");

    if(autoUpdate){
        btn.innerText = "🟢 Auto ON";
        interval = setInterval(fetchConfigs, 30000);
    }else{
        btn.innerText = "🔴 Auto OFF";
        clearInterval(interval);
    }
}

// اجرا
fetchConfigs();
