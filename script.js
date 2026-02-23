let data = {};

// گرفتن دیتا
async function loadData(){
    const res = await fetch("configs.json?v=" + Date.now());
    const json = await res.json();

    data = {};

    json.countries.forEach(c=>{
        if(c.name.includes("آمریکا") || c.name.includes("آلمان")){
            data[c.name + " " + c.flag] = c.configs;
        }
    });

    document.getElementById("lastUpdate").innerText =
        "آخرین آپدیت: " + json.last_update;

    showCountries();
}

// نمایش کشورها
function showCountries(){
    const div = document.getElementById("countries");
    const configs = document.getElementById("configs");

    div.innerHTML = "";
    configs.innerHTML = "";

    for(let c in data){
        const box = document.createElement("div");
        box.className = "country";
        box.innerText = c + " (" + data[c].length + ")";

        box.onclick = ()=> showConfigs(c);

        div.appendChild(box);
    }
}

// نمایش کانفیگ‌ها
function showConfigs(country){
    const configs = document.getElementById("configs");
    configs.innerHTML = `<h3>${country}</h3>`;

    // 🔥 دکمه کپی همه
    const allBtn = document.createElement("button");
    allBtn.innerText = "📋 کپی همه";
    allBtn.onclick = ()=>{
        navigator.clipboard.writeText(data[country].join("\n"));
        alert("همه کپی شد ✅");
    };
    configs.appendChild(allBtn);

    data[country].forEach(cfg=>{
        const div = document.createElement("div");
        div.className = "config";

        div.innerHTML = `
            <div>${cfg}</div>
            <button onclick="copy('${cfg}')">کپی</button>
        `;

        configs.appendChild(div);
    });
}

// کپی
function copy(text){
    navigator.clipboard.writeText(text);
    alert("کپی شد ✅");
}

// سرچ
document.getElementById("search").addEventListener("input", function(){
    const value = this.value.toLowerCase();

    document.querySelectorAll(".country").forEach(c=>{
        c.style.display =
            c.innerText.toLowerCase().includes(value)
            ? "block" : "none";
    });
});

// اجرا
loadData();
