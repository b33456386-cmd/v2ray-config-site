async function loadData(){
    const res = await fetch("configs.json?v=" + Date.now());
    const data = await res.json();

    document.getElementById("lastUpdate").innerText =
        "🕒 آخرین آپدیت: " + data.last_update;

    const app = document.getElementById("app");
    app.innerHTML = "";

    data.countries.forEach(c=>{
        const div = document.createElement("div");
        div.className = "countryCard";
        div.innerHTML = `${c.flag} ${c.name} (${c.count})`;
        div.onclick = ()=> showConfigs(c);
        app.appendChild(div);
    });
}

function showConfigs(country){
    const app = document.getElementById("app");
    app.innerHTML = "";

    // 🔥 دکمه کپی همه
    const allBtn = document.createElement("div");
    allBtn.className = "copyAll";
    allBtn.innerText = "📋 کپی همه کانفیگ‌ها";
    allBtn.onclick = ()=>{
        navigator.clipboard.writeText(country.configs.join("\n"));
        alert("همه کپی شد ✅");
    };
    app.appendChild(allBtn);

    // لیست کانفیگ‌ها
    country.configs.forEach(cfg=>{
        const box = document.createElement("div");
        box.className = "configBox";

        const txt = document.createElement("div");
        txt.className = "configText";
        txt.innerText = cfg;

        const btn = document.createElement("button");
        btn.className = "copyBtn";
        btn.innerText = "کپی";
        btn.onclick = ()=>{
            navigator.clipboard.writeText(cfg);
            alert("کپی شد ✅");
        };

        box.appendChild(txt);
        box.appendChild(btn);
        app.appendChild(box);
    });

    // دکمه برگشت
    const back = document.createElement("button");
    back.className = "backBtn";
    back.innerText = "🔙 بازگشت";
    back.onclick = loadData;

    app.appendChild(back);
}

loadData();
