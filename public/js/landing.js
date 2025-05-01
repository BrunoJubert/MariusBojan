document.addEventListener("DOMContentLoaded", () => {
  // Supprime le preload CSS une fois le JS chargé
  const preload = document.getElementById("landing-preload");
  if (preload) preload.remove();

  const landing = document.getElementById("landing-page");
  if (!landing) return;

  // Cache immédiatement si déjà vu
  if (sessionStorage.getItem("landingSeen")) {
    landing.style.display = "none";
    document.body.classList.remove("landing-active");
    return;
  }

  // Initialise les éléments
  const enterBtn = document.getElementById("enter-site-btn");
  const mainElements = ["main", "header", "footer"];

  // Active le mode landing
  document.body.classList.add("landing-active");
  mainElements.forEach((tag) => {
    const el = document.querySelector(tag);
    if (el) el.style.display = "none";
  });

  // Gestion du clic
  enterBtn.addEventListener("click", () => {
    sessionStorage.setItem("landingSeen", "true");
    landing.style.opacity = "0";
    landing.style.pointerEvents = "none";

    setTimeout(() => {
      landing.style.display = "none";
      document.body.classList.remove("landing-active");
      mainElements.forEach((tag) => {
        const el = document.querySelector(tag);
        if (el) el.style.display = "";
      });
    }, 500);
  });
});
