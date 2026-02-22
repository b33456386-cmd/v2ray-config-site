document.addEventListener("DOMContentLoaded", () => {

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
        btn.innerText = country.flag + " " + country.name + " (" + country.count + ")";

        let list = document.createElement("div");
        list.style.display = "none";

        btn.onclick = () => {
          list.style.display =
            list.style.display === "none" ? "block" : "none";
        };

        country.configs.forEach(cfg => {
          allConfigs.push(cfg);

          let div = document.createElement("div");
          div.style.margin = "10px";
          div.style.padding = "10px";
          div.style.border = "1px solid gray";
          div.style.borderRadius = "10px";

          let text = document.createElement("p");
          text.innerText = cfg;

          let copyBtn = document.createElement("button");
          copyBtn.innerText = "📋 کپی";
          copyBtn.style.background = "green";
          copyBtn.style.color = "white";
          copyBtn.style.marginTop = "5px";

          copyBtn.onclick = () => {
            // روش قدیمی (همه جا کار می‌کنه)
            let temp = document.createElement("textarea");
            temp.value = cfg;
            document.body.appendChild(temp);
            temp.select();
            document.execCommand("copy");
            document.body.removeChild(temp);

            alert("کپی شد ✅");
          };

          div.appendChild(text);
          div.appendChild(copyBtn);

          list.appendChild(div);
        });

        container.appendChild(btn);
        container.appendChild(list);
      });
    });

});
