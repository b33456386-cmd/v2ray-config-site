let allConfigs = [];

fetch("configs.json?v=" + new Date().getTime())
  .then(res => res.json())
  .then(data => {

    document.getElementById("lastUpdate").innerText =
      "آخرین آپدیت: " + data.last_update;

    let container = document.getElementById("countries");
    container.innerHTML = "";

    data.countries.forEach(country => {

      // دکمه کشور
      let btn = document.createElement("button");
      btn.innerText = `${country.flag} ${country.name} (${country.count})`;

      // لیست کانفیگ‌ها
      let list = document.createElement("div");
      list.style.display = "none"; // مهم

      btn.onclick = () => {
        if (list.style.display === "none") {
          list.style.display = "block";
        } else {
          list.style.display = "none";
        }
      };

      // کانفیگ‌ها
      country.configs.forEach(cfg => {
        allConfigs.push(cfg);

        let div = document.createElement("div");
        div.className = "config";

        let short = cfg.substring(0, 50);

        div.innerHTML = `
          <span>${short}...</span>
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
