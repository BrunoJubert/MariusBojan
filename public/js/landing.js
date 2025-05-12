document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".carousel-slide");
  const indicators = document.querySelectorAll(
    ".carousel-indicators .indicator"
  );
  const carousel = document.getElementById("landing-carousel");
  let current = 0;
  let timer = null;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
      indicators[i].classList.toggle("active", i === index);
    });
    current = index;
  }

  function nextSlide() {
    showSlide((current + 1) % slides.length);
  }

  function prevSlide() {
    showSlide((current - 1 + slides.length) % slides.length);
  }

  indicators.forEach((ind, i) => {
    ind.addEventListener("click", () => {
      showSlide(i);
      resetTimer();
    });
  });

  function resetTimer() {
    if (timer) clearInterval(timer);
    timer = setInterval(nextSlide, 7000);
  }

  // --- Ajout du swipe tactile ---
  let startX = null;

  carousel.addEventListener("touchstart", function (e) {
    if (e.touches.length === 1) {
      startX = e.touches[0].clientX;
    }
  });

  carousel.addEventListener("touchend", function (e) {
    if (startX === null) return;
    let endX = e.changedTouches[0].clientX;
    let diffX = endX - startX;
    if (Math.abs(diffX) > 40) {
      // seuil de détection du swipe
      if (diffX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      resetTimer();
    }
    startX = null;
  });

  // Auto défilement
  timer = setInterval(nextSlide, 7000);

  // Init
  showSlide(0);
});
