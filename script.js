let auto = false;
let interval;

// گرفتن دیتا
async function loadData(){
    const res = await fetch("configs.json?v=" + Date.now());
    const data = await res.json();

    document.getElementById("lastUpdate").innerText =
        "🕒 آخرین آپدیت: " + data.last_update;

    const app = document.getElementById("app");
    app.innerHTML = "";

    data.countries.forEach(c=>{
        const div = document.createElement("div");
        div.className = "countryCard fadeIn";
        div.innerHTML = `${c.flag} ${c.name} (${c.count})`;
        div.onclick = ()=> showConfigs(c);
        app.appendChild(div);
    });
}

// نمایش کانفیگ‌ها
function showConfigs(country){
    const app = document.getElementById("app");
    app.innerHTML = "";

    // 🔥 کپی همه
    const allBtn = document.createElement("div");
    allBtn.className = "copyAll fadeIn";
    allBtn.innerText = "📋 کپی همه کانفیگ‌ها";
    allBtn.onclick = ()=>{
        navigator.clipboard.writeText(country.configs.join("\n"));
        alert("همه کپی شد ✅");
    };
    app.appendChild(allBtn);

    // لیست
    country.configs.forEach(cfg=>{
        const box = document.createElement("div");
        box.className = "configBox fadeIn";

        box.innerHTML = `
            <div class="configText">${cfg}</div>
            <button class="copyBtn">کپی</button>
        `;

        box.querySelector("button").onclick = ()=>{
            navigator.clipboard.writeText(cfg);
            alert("کپی شد ✅");
        };

        app.appendChild(box);
    });

    // برگشت
    const back = document.createElement("button");
    back.className = "backBtn fadeIn";
    back.innerText = "🔙 بازگشت";
    back.onclick = loadData;

    app.appendChild(back);
}

// سرچ
document.getElementById("search").addEventListener("input", function(){
    const value = this.value.toLowerCase();
    const cards = document.querySelectorAll(".countryCard");

    cards.forEach(c=>{
        c.style.display = c.innerText.toLowerCase().includes(value)
            ? "block" : "none";
    });
});

// آپدیت دستی
function manualUpdate(){
    loadData();
}

// 🔥 Auto Update
function toggleAuto(){
    auto = !auto;
    const btn = document.getElementById("autoBtn");

    if(auto){
        btn.innerText = "🟢 Auto ON";
        interval = setInterval(loadData, 30000); // هر 30 ثانیه
    }else{
        btn.innerText = "🔴 Auto OFF";
        clearInterval(interval);
    }
}

loadData();
