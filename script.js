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
let interval = null;

// گرفتن کانفیگ‌ها
async function fetchConfigs(){
    try{
        const res = await fetch("generate.json?" + new Date().getTime());
        const json = await res.json();

        data = {};

        json.forEach(cfg=>{
            let text = cfg.toLowerCase();
            let country = null;

            // 🇺🇸 آمریکا
            if (
                text.includes("us") ||
                text.includes("usa") ||
                text.includes("america")
            ){
                country = "آمریکا 🇺🇸";
            }

            // 🇩🇪 آلمان
            else if (
                text.includes("de") ||
                text.includes("germany")
            ){
                country = "آلمان 🇩🇪";
            }

            // فقط این دو کشور
            if(country){
                if(!data[country]) data[country] = [];
                data[country].push(cfg);
            }
        });

        loadConfigs();
        updateTime();

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
        div.className = "country";
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

// آپدیت دستی
function manualUpdate(){
    fetchConfigs();
}

// اتو آپدیت
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

// اجرای اولیه
fetchConfigs();
