document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".country-btn");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const country = button.getAttribute("data-country");

      document.querySelectorAll(".config-list").forEach(list => {
        list.style.display = "none";
      });

      const target = document.getElementById(country);
      if (target) {
        target.style.display = "block";
      }
    });
  });
});
