async function fetchConfigs(){
    try{
        const res = await fetch("./configs.json?" + Date.now());
        const json = await res.json();

        document.getElementById("lastUpdate").innerText =
            "آخرین آپدیت: " + json.last_update;

        const app = document.getElementById("app");
        app.innerHTML = "";

        json.countries.forEach(country=>{
            const div = document.createElement("div");
            div.className = "country";
            div.innerText = `${country.name} ${country.flag} (${country.count})`;

            div.onclick = ()=>{
                showConfigs(country);
            };

            app.appendChild(div);
        });

    }catch(e){
        document.getElementById("app").innerText = "❌ خطا در لود";
    }
}

function showConfigs(country){
    const app = document.getElementById("app");
    app.innerHTML = `<h2>${country.name}</h2>`;

    country.configs.forEach(cfg=>{
        const box = document.createElement("div");
        box.className = "configBox";

        box.innerHTML = `
            <p>${cfg}</p>
            <button onclick="copyConfig('${cfg}')">📋 کپی</button>
        `;

        app.appendChild(box);
    });

    const back = document.createElement("button");
    back.innerText = "🔙 بازگشت";
    back.onclick = fetchConfigs;
    app.appendChild(back);
}

function copyConfig(text){
    navigator.clipboard.writeText(text);
    alert("کپی شد ✅");
}

fetchConfigs();
setInterval(fetchConfigs, 60000);
