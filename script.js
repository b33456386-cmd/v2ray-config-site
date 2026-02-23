async function loadData(){
    const res = await fetch("configs.json?v=" + Date.now());
    const data = await res.json();

    document.getElementById("lastUpdate").innerText =
        "آخرین آپدیت: " + data.last_update;

    const app = document.getElementById("app");
    app.innerHTML = "";

    data.countries.forEach(c=>{
        const div = document.createElement("div");
        div.className = "country";
        div.innerText = `${c.flag} ${c.name} (${c.count})`;
        div.onclick = ()=> showConfigs(c);
        app.appendChild(div);
    });
}

function showConfigs(country){
    const app = document.getElementById("app");
    app.innerHTML = "";

    // 🔥 کپی همه
    const allBtn = document.createElement("div");
    allBtn.style.background = "linear-gradient(45deg,#ff7e5f,#feb47b)";
    allBtn.style.padding = "15px";
    allBtn.style.margin = "10px 0";
    allBtn.style.borderRadius = "15px";
    allBtn.style.textAlign = "center";
    allBtn.style.cursor = "pointer";
    allBtn.innerText = "📋 کپی همه کانفیگ‌ها";

    allBtn.onclick = ()=>{
        const all = country.configs.join("\n");
        navigator.clipboard.writeText(all);
        alert("همه کپی شد ✅");
    };

    app.appendChild(allBtn);

    // لیست
    country.configs.forEach(cfg=>{
        const box = document.createElement("div");
        box.style.background = "#1e2a44";
        box.style.margin = "10px 0";
        box.style.padding = "10px";
        box.style.borderRadius = "10px";

        const txt = document.createElement("div");
        txt.innerText = cfg;

        const btn = document.createElement("button");
        btn.innerText = "کپی";
        btn.onclick = ()=>{
            navigator.clipboard.writeText(cfg);
            alert("کپی شد ✅");
        };

        box.appendChild(txt);
        box.appendChild(btn);
        app.appendChild(box);
    });

    // برگشت
    const back = document.createElement("button");
    back.innerText = "🔙 بازگشت";
    back.onclick = loadData;

    app.appendChild(back);
}

loadData();
