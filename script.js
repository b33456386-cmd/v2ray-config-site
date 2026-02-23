function showConfigs(country){
    const app = document.getElementById("app");
    app.innerHTML = "";

    // دکمه کپی همه
    const allBtn = document.createElement("div");
    allBtn.className = "copyAll";
    allBtn.innerText = "📋 کپی همه کانفیگ‌ها";
    allBtn.onclick = ()=>{
        const all = country.configs.join("\n");
        navigator.clipboard.writeText(all);
        alert("همه کانفیگ‌ها کپی شد ✅");
    };
    app.appendChild(allBtn);

    // لیست کانفیگ‌ها
    country.configs.forEach(cfg=>{
        const box = document.createElement("div");
        box.className = "configBox";

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

    // دکمه برگشت
    const back = document.createElement("button");
    back.innerText = "🔙 بازگشت";
    back.onclick = loadData;

    app.appendChild(back);
}
