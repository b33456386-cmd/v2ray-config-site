let data = {};

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

    const el = document.getElementById("lastUpdate");
    if(el) el.innerText = "آخرین آپدیت: " + iranTime + " ⏰";
}
updateTime();

// گرفتن دیتا
async function fetchConfigs(){
    try{
        const res = await fetch("configs.json?" + new Date().getTime());
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

        loadConfigs();

    }catch(e){
        console.log(e);
        document.getElementById("app").innerHTML = "خطا در دریافت ❌";
    }
}

// نمایش کشورها
function loadConfigs(){
    const app = document.getElementById("app");
    if(!app) return;

    app.innerHTML = "";

    for(let country in data){
        let div = document.createElement("div");
        div.className = "country";
        div.innerText = country + " (" + data[country].length + ")";
        div.onclick = ()=> showConfigs(country);
        app.appendChild(div);
    }
}

// نمایش کانفیگ
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

// سرچ
window.addEventListener("DOMContentLoaded", ()=>{
    const searchInput = document.getElementById("search");

    if(searchInput){
        searchInput.addEventListener("input", function(){
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
    }

    fetchConfigs();
});
