document.addEventListener("DOMContentLoaded", () => {

  let allConfigs = [];

  const searchInput = document.getElementById("searchInput");
  const themeBtn = document.getElementById("themeBtn");
  const randomBtn = document.getElementById("randomBtn");

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
        list.style.display = "none";

        btn.onclick = () => {
          list.style.display =
            list.style.display === "none" ? "block" : "none";
        };

        country.configs.forEach(cfg => {
          allConfigs.push(cfg);

          let div = document.createElement("div");
          div.className = "config";

          let text = document.createElement("span");
          text.innerText = cfg.substring(0, 60) + "...";

          let copyBtn = document.createElement("button");
          copyBtn.innerText = "📋 کپی";

          // ✅ این مهمه (بدون onclick HTML)
          copyBtn.addEventListener("click", () => {
            navigator.clipboard.writeText(cfg);
            alert("کپی شد ✅");
          });

          div.appendChild(text);
          div.appendChild(copyBtn);

          list.appendChild(div);
        });

        container.appendChild(btn);
        container.appendChild(list);
      });
    });

  // 🔍 سرچ
  searchInput.addEventListener("input", () => {
    let value = searchInput.value.toLowerCase();

    document.querySelectorAll(".config").forEach(el => {
      el.style.display = el.innerText.toLowerCase().includes(value)
        ? "block"
        : "none";
    });
  });

  // 🌙 دارک مود
  themeBtn.onclick = () => {
    document.body.classList.toggle("light");
  };

  // 🎲 رندوم
  randomBtn.onclick = () => {
    if (allConfigs.length === 0) return;

    let random = allConfigs[Math.floor(Math.random() * allConfigs.length)];
    navigator.clipboard.writeText(random);
    alert("رندوم کپی شد 🎲");
  };

});
