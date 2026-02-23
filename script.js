let data = {};

// گرفتن دیتا
async function loadData(){
    const res = await fetch("generate.json?v=" + Date.now());
    const json = await res.json();

    data = {
        "آمریکا 🇺🇸": [],
        "آلمان 🇩🇪": []
    };

    json.forEach(cfg=>{
        if(cfg.includes("US"))
            data["آمریکا 🇺🇸"].push(cfg);

        else if(cfg.includes("DE"))
            data["آلمان 🇩🇪"].push(cfg);
    });

    document.getElementById("lastUpdate").innerText =
        "آخرین آپدیت: " + new Date().toLocaleString("fa-IR");

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
