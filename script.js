let allConfigs = [];

fetch("configs.json")
  .then(res => res.json())
  .then(data => {

    document.getElementById("lastUpdate").innerText =
      "آخرین آپدیت: " + data.last_update;

    let container = document.getElementById("countries");

    data.countries.forEach(country => {

      let box = document.createElement("div");
      box.className = "country";

      let btn = document.createElement("button");
      btn.innerText = `${country.flag} ${country.name} (${country.count})`;

      let list = document.createElement("div");
      list.style.display = "none";

      btn.onclick = () => {
        list.style.display =
          list.style.display === "none" ? "block" : "none";
      };

      country.configs.forEach(cfg => {
        allConfigs.push(cfg);

        let div = document.createElement("div");
        div.className = "config";

        div.innerHTML = `
          <span>${cfg.substring(0, 40)}...</span>
          <button onclick="copyConfig('${cfg}')">📋</button>
        `;

        list.appendChild(div);
      });

      box.appendChild(btn);
      box.appendChild(list);
      container.appendChild(box);
    });
  });

function copyConfig(text) {
  navigator.clipboard.writeText(text);
  alert("کپی شد ✅");
}

function randomConfig() {
  if (allConfigs.length === 0) return;

  let random = allConfigs[Math.floor(Math.random() * allConfigs.length)];
  navigator.clipboard.writeText(random);
  alert("یک کانفیگ رندوم کپی شد 🎲");
}
