function toggleCountry(country) {
  const all = document.querySelectorAll(".config-list");

  all.forEach(el => {
    if (el.id === country) {
      el.style.display = el.style.display === "block" ? "none" : "block";
    } else {
      el.style.display = "none";
    }
  });
}

function copyConfig(config) {
  navigator.clipboard.writeText(config);
  alert("کپی شد ✅");
}
