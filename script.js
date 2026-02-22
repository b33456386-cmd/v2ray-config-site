fetch("data.json")
  .then(res => res.json())
  .then(data => {

    document.getElementById("lastUpdate").innerText =
      "⏱ آخرین آپدیت: " + data.last_update;

    const container = document.getElementById("countries");

    data.countries.forEach(country => {

      const div = document.createElement("div");
      div.className = "country";

      const btn = document.createElement("button");
      btn.className = "country-btn";
      btn.innerText =
        `${country.flag} ${country.name} (${country.configs.length})`;

      const configsDiv = document.createElement("div");
      configsDiv.className = "configs";

      // دکمه رندوم
      const randomBtn = document.createElement("button");
      randomBtn.className = "copy-btn";
      randomBtn.innerText = "🎲 کانفیگ رندوم";

      randomBtn.onclick = () => {
        const random =
          country.configs[Math.floor(Math.random() * country.configs.length)];

        navigator.clipboard.writeText(random);
        randomBtn.innerText = "✅ کپی شد!";
        setTimeout(() => randomBtn.innerText = "🎲 کانفیگ رندوم", 1500);
      };

      configsDiv.appendChild(randomBtn);

      country.configs.forEach(cfg => {
        const c = document.createElement("div");
        c.className = "config";

        const text = document.createElement("div");
        text.innerText = cfg;

        const copy = document.createElement("button");
        copy.className = "copy-btn";
        copy.innerText = "📋 کپی";

        copy.onclick = () => {
          navigator.clipboard.writeText(cfg);
          copy.innerText = "✅ شد!";
          setTimeout(() => copy.innerText = "📋 کپی", 1500);
        };

        c.appendChild(text);
        c.appendChild(copy);
        configsDiv.appendChild(c);
      });

      btn.onclick = () => {
        configsDiv.style.display =
          configsDiv.style.display === "block" ? "none" : "block";
      };

      div.appendChild(btn);
      div.appendChild(configsDiv);
      container.appendChild(div);
    });
  });
