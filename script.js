let auto = false;
let interval;
let data = {};

// 🔥 سورس قوی
const API = "https://raw.githubusercontent.com/barry-far/V2ray-Configs/main/Sub1.txt";

// ⏰ زمان
function updateTime(){
    document.getElementById("lastUpdate").innerText =
        "آخرین آپدیت: " + new Date().toLocaleString("fa-IR");
}

// 🚀 گرفتن دیتا
async function fetchData(){
    try{
        const res = await fetch(API + "?t=" + Date.now());
        const text = await res.text();

        parseData(text);
        updateTime();
        loadCountries();

    }catch(e){
        document.getElementById("app").innerHTML = "❌ خطا در دریافت";
    }
}

// 📦 تشخیص کشور خودکار
function parseData(text){
    data = {};
    const lines = text.split("\n");

    lines.forEach(line=>{
        let country = "🌍 سایر";

        if(line.includes("US")) country = "🇺🇸 آمریکا";
        else if(line.includes("DE")) country = "🇩🇪 آلمان";
        else if(line.includes("FR")) country = "🇫🇷 فرانسه";
        else if(line.includes("NL")) country = "🇳🇱 هلند";
        else if(line.includes("GB")) country = "🇬🇧 انگلیس";
        else if(line.includes("TR")) country = "🇹🇷 ترکیه";
        else if(line.includes("CA")) country = "🇨🇦 کانادا";

        if(!data[country]) data[country] = [];
        data[country].push(line);
    });
}

// 🌍 نمایش کشورها
function loadCountries(){
    const app = document.getElementById("app");
    app.innerHTML = "";

    Object.keys(data).forEach(country=>{
        let div = document.createElement("div");
        div.className = "country";
        div.innerText = country + " (" + data[country].length + ")";
        div.onclick = ()=> showConfigs(country);
        app.appendChild(div);
    });
}

// 📄 نمایش کانفیگ
function showConfigs(country){
    const app = document.getElementById("app");
    app.innerHTML = `<h3>${country}</h3>`;

    data[country].forEach(cfg=>{
        let box = document.createElement("div");
        box.className = "config";

        box.innerHTML = `
        ${cfg}
        <br>
        <button class="copy" onclick="copyConfig('${cfg}')">📋 کپی</button>
        `;

        app.appendChild(box);
    });

    let back = document.createElement("button");
    back.innerText = "🔙 بازگشت";
    back.onclick = loadCountries;
    app.appendChild(back);
}

// 📋 کپی
function copyConfig(text){
    navigator.clipboard.writeText(text);
    alert("کپی شد ✅");
}

// 🔍 سرچ
document.getElementById("search").addEventListener("input", function(){
    const val = this.value.toLowerCase();
    const items = document.querySelectorAll(".country");

    items.forEach(i=>{
        i.style.display = i.innerText.toLowerCase().includes(val)
            ? "block"
            : "none";
    });
});

// 🔄 دکمه آپدیت
function manualUpdate(){
    fetchData();
}

// 🤖 Auto
function toggleAuto(){
    auto = !auto;
    const btn = document.getElementById("autoBtn");

    if(auto){
        btn.innerText = "🟢 Auto ON";
        interval = setInterval(fetchData, 10000);
    }else{
        btn.innerText = "🔴 Auto OFF";
        clearInterval(interval);
    }
}

// اجرا
fetchData();
