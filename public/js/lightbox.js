document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = lightbox.querySelector(".lightbox-img");
  const closeBtn = lightbox.querySelector(".lightbox-close");

  document.querySelectorAll(".gallery-item img").forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  closeBtn.addEventListener("click", () => {
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
    document.body.style.overflow = "auto";
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeBtn.click();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      lightbox.getAttribute("aria-hidden") === "false"
    ) {
      closeBtn.click();
    }
  });
});
