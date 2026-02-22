let allConfigs = [];

fetch("configs.json?v=" + new Date().getTime())
  .then(res => res.json())
  .then(data => {

    document.getElementById("lastUpdate").innerText =
      "آخرین آپدیت: " + data.last_update;

    let container = document.getElementById("countries");
    container.innerHTML = "";

    data.countries.forEach(country => {

      let btn = document.createElement("button");
      btn.innerText = `${country.flag} ${country.name} (${country.count})`;

      let list = document.createElement("div");
      list.className = "country-list";

      btn.onclick = () => {
        list.classList.toggle("open");
      };

      country.configs.forEach(cfg => {
        allConfigs.push(cfg);

        let div = document.createElement("div");
        div.className = "config";

        div.innerHTML = `
          <span>${cfg.substring(0,40)}...</span>
          <button onclick="copyConfig('${cfg}')">📋</button>
        `;

        list.appendChild(div);
      });

      container.appendChild(btn);
      container.appendChild(list);
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
  alert("رندوم کپی شد 🎲");
}

function toggleTheme() {
  document.body.classList.toggle("light");
}

function searchConfig(query) {
  document.querySelectorAll(".config").forEach(el => {
    el.style.display = el.innerText.includes(query) ? "block" : "none";
  });
}
