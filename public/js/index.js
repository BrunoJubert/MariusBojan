document.addEventListener("DOMContentLoaded", () => {
  // --- MENU BURGER ---
  const burger = document.getElementById("burgerBtn");
  const menu = document.getElementById("navLinks");

  if (burger && menu) {
    burger.addEventListener("click", (e) => {
      e.stopPropagation();
      menu.classList.toggle("active");
      burger.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target) && !burger.contains(e.target)) {
        menu.classList.remove("active");
        burger.classList.remove("active");
      }
    });

    window.addEventListener("scroll", () => {
      menu.classList.remove("active");
      burger.classList.remove("active");
    });
  }

  // --- ANIMATION DES CARDS ---
  document.querySelectorAll(".flip-card").forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
    });
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.classList.toggle("flipped");
      }
    });
  });

  // --- BOUTON ACHETER L'ALBUM ---
  const buyBtn = document.getElementById("buy-btn");
  if (buyBtn) {
    buyBtn.addEventListener("click", (e) => {
      e.preventDefault();

      // Scroll fluide vers formulaire
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }

      // Après un délai, sélectionne le sujet dans le formulaire
      setTimeout(() => {
        const subjectInput = document.getElementById("subject");
        if (subjectInput) {
          subjectInput.value = "Album"; // correspond à la valeur dans ton <select>
          subjectInput.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }, 400);
    });
  }

  // --- FORMULAIRE DE CONTACT ---
  const contactForm = document.querySelector("#contact form");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      try {
        submitBtn.textContent = "Envoi en cours...";
        submitBtn.disabled = true;

        const response = await fetch(contactForm.action, {
          method: "POST",
          body: new FormData(contactForm),
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          alert("Message envoyé avec succès !");
          contactForm.reset();
        } else {
          throw new Error("Erreur lors de l'envoi");
        }
      } catch (error) {
        alert("Une erreur est survenue, veuillez réessayer.");
        console.error(error);
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  // --- ANNÉE DYNAMIQUE ---
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // --- HEADER SCROLL ---
  const musicianHeader = document.querySelector(".musician-header");
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 80) {
      musicianHeader.classList.add("scrolled");
    } else {
      musicianHeader.classList.remove("scrolled");
    }

    if (
      currentScrollY > lastScrollY &&
      currentScrollY > 100 &&
      window.innerWidth < 900
    ) {
      musicianHeader.classList.add("hide");
    } else {
      musicianHeader.classList.remove("hide");
    }

    lastScrollY = currentScrollY;
  });

  // --- ANIMATION APPARITION SECTIONS ---
  const sections = document.querySelectorAll(".section-appear");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    },
    { threshold: 0.2 }
  );
  sections.forEach((section) => observer.observe(section));

  // --- AUDIO ET BOUTONS ÉCOUTER ---
  const listenBtnCarousel = document.querySelector(
    ".carousel-caption .listen-btn"
  );
  const listenBtnAccueil = document.querySelector(".btn-center .listen-btn");
  const flipCard = document.querySelector(".flip-card");
  const cdAudioWrapper = document.getElementById("cd-audio-wrapper");
  const audio = document.getElementById("audio-player");
  const cdImage = document.getElementById("cd-image");
  const listenmusic = document.getElementById("listenmusic");

  if (listenBtnCarousel) {
    listenBtnCarousel.addEventListener("click", (e) => {
      e.preventDefault();
      listenmusic.scrollIntoView({ behavior: "smooth" });
      if (flipCard.classList.contains("flipped")) {
        flipCard.classList.remove("flipped");
      }
      cdAudioWrapper.style.display = "flex";
      audio.currentTime = 0;
      audio.play();
    });
  }

  if (listenBtnAccueil) {
    listenBtnAccueil.addEventListener("click", (e) => {
      e.preventDefault();
      if (listenBtnAccueil.textContent === "Stop") {
        audio.pause();
        audio.currentTime = 0;
        cdImage.classList.remove("playing");
        cdAudioWrapper.style.display = "none";
        flipCard.classList.remove("flipped");
        listenBtnAccueil.textContent = "Écouter un extrait";
      } else {
        if (flipCard.classList.contains("flipped")) {
          flipCard.classList.remove("flipped");
        }
        cdAudioWrapper.style.display = "flex";
        audio.currentTime = 0;
        audio.play();
        listenBtnAccueil.textContent = "Stop";
      }
    });
  }

  audio.addEventListener("play", () => {
    cdImage.classList.remove("playing");
    void cdImage.offsetWidth;
    cdImage.classList.add("playing");
    if (listenBtnAccueil) listenBtnAccueil.textContent = "Stop";
  });

  audio.addEventListener("ended", () => {
    cdImage.classList.remove("playing");
    cdAudioWrapper.style.display = "none";
    flipCard.classList.remove("flipped");
    if (listenBtnAccueil) listenBtnAccueil.textContent = "Écouter un extrait";
  });

  // --- DOSSIER DE PRESSE ---
  const consulterBtn = document.getElementById("consulterBtn");
  const imagesPresse = document.getElementById("imagesPresse");
  const telechargerBtn = document.getElementById("telechargerBtn");

  if (consulterBtn && imagesPresse && telechargerBtn) {
    consulterBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (
        imagesPresse.style.display === "none" ||
        !imagesPresse.style.display
      ) {
        imagesPresse.style.display = "block";
        telechargerBtn.style.display = "inline-block";
        consulterBtn.classList.add("active");
        imagesPresse.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        imagesPresse.style.display = "none";
        telechargerBtn.style.display = "none";
        consulterBtn.classList.remove("active");
      }
    });
  }

  // --- ANIMATION CONCERTS ---
  const concertsBtn = document.getElementById("concertsBtn");
  const concertsCards = document.getElementById("concertsCards");
  if (concertsBtn && concertsCards) {
    concertsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      concertsBtn.classList.toggle("active");
      concertsCards.style.display =
        concertsCards.style.display === "none" ? "block" : "none";
      if (concertsCards.style.display === "block") {
        concertsCards.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  // --- ANIMATION PROJETS ---
  const projetsBtn = document.getElementById("projetsBtn");
  const projetsVideos = document.getElementById("projetsVideos");
  if (projetsBtn && projetsVideos) {
    projetsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      projetsBtn.classList.toggle("active");
      projetsVideos.style.display =
        projetsVideos.style.display === "none" ? "block" : "none";
      if (projetsVideos.style.display === "block") {
        projetsVideos.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  // --- ANIMATION BIOGRAPHIE ---
  const lireBioBtn = document.getElementById("lireBioBtn");
  const bioTexte = document.getElementById("bioTexte");
  if (lireBioBtn && bioTexte) {
    lireBioBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (bioTexte.style.display === "none" || !bioTexte.style.display) {
        bioTexte.style.display = "block";
        lireBioBtn.classList.add("active");
        bioTexte.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => bioTexte.classList.add("visible"), 10);
      } else {
        bioTexte.style.display = "none";
        lireBioBtn.classList.remove("active");
        bioTexte.classList.remove("visible");
      }
    });
  }
});

// --- Fonctions/utilitaires externes ---

function checkMcAfeeCompatibility() {
  try {
    const isMcAfeeUserAgent = /mcafee/i.test(navigator.userAgent);
    const hasWebAdvisorEntry = window.performance
      ?.getEntries()
      .some((entry) => /webadvisor/i.test(entry.name));

    if (isMcAfeeUserAgent || hasWebAdvisorEntry) {
      console.log("[Compatibility] Mode McAfee détecté");
      document.cookie = "mcafee_compat=1; Secure; SameSite=Lax; path=/";
    }
  } catch (error) {
    console.error("[Compatibility] Erreur de détection McAfee:", error);
  }
}
document.addEventListener("DOMContentLoaded", checkMcAfeeCompatibility);

function checkAdBlock() {
  const fakeAd = document.createElement("div");
  fakeAd.className = "ad-class";
  document.body.appendChild(fakeAd);

  setTimeout(() => {
    const isBlocked = fakeAd.offsetHeight === 0;
    document.body.removeChild(fakeAd);

    if (isBlocked) {
      console.log("[Compatibility] AdBlock détecté");
      document.cookie = "adblock_detected=1; path=/";
    }
  }, 100);
}
window.addEventListener("load", checkAdBlock);
