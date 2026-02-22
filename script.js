fetch("data.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("countries");

    const iranTime = new Date(data.last_update).toLocaleString("fa-IR", {
      timeZone: "Asia/Tehran",
      hour: "2-digit",
      minute: "2-digit",
    });

    document.getElementById("update").innerText =
      "⏱ آخرین آپدیت: " + iranTime;

    data.countries.forEach(country => {
      const btn = document.createElement("button");
      btn.className = "country-btn";
      btn.innerHTML = `${country.flag} ${country.name} (${country.configs.length})`;

      const list = document.createElement("div");
      list.className = "config-list";

      country.configs.forEach(cfg => {
        const item = document.createElement("div");
        item.className = "config-item";

        item.innerHTML = `
          <span>V2raying_config</span>
          <button onclick="copyConfig('${cfg}')">📋</button>
        `;

        list.appendChild(item);
      });

      btn.onclick = () => {
        const all = document.querySelectorAll(".config-list");
        all.forEach(el => (el.style.display = "none"));
        list.style.display =
          list.style.display === "block" ? "none" : "block";
      };

      container.appendChild(btn);
      container.appendChild(list);
    });
  });

function copyConfig(config) {
  navigator.clipboard.writeText(config);
  alert("کپی شد ✅");
}
