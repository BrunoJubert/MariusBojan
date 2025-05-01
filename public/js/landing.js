document.addEventListener("DOMContentLoaded", () => {
  const landing = document.getElementById("landing-page");
  if (!landing) return; // Quitte si pas de landing (ex: autres pages)

  const enterBtn = document.getElementById("enter-site-btn");
  const main = document.querySelector("main");
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");

  document.body.classList.add("landing-active");
  if (main) main.style.display = "none";
  if (header) header.style.display = "none";
  if (footer) footer.style.display = "none";

  enterBtn.addEventListener("click", () => {
    landing.style.opacity = "0";
    landing.style.pointerEvents = "none";
    setTimeout(() => {
      landing.style.display = "none";
      document.body.classList.remove("landing-active");
      if (main) main.style.display = "";
      if (header) header.style.display = "";
      if (footer) footer.style.display = "";
    }, 500);
  });
});
