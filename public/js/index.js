document.addEventListener("DOMContentLoaded", () => {
  // MENU BURGER
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

  // ANIMATION DES CARDS
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

  // FORMULAIRE DE CONTACT
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

  // ANNÉE DYNAMIQUE
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // HEADER SCROLL (masquer sur mobile au scroll vers le bas)
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

  // ANIMATION APPARITION SECTIONS
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

  // FLIP-CARD AUDIO & RONDELLE 
  const listenBtns = document.querySelectorAll(".listen-btn");
  const flipCard = document.querySelector(".flip-card");
  const cdAudioWrapper = document.getElementById("cd-audio-wrapper");
  const audio = document.getElementById("audio-player");
  const cdImage = document.getElementById("cd-image");
  const stopBtn = document.getElementById("pause-btn");

  listenBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault(); 
      document.getElementById("accueil").scrollIntoView({ behavior: "smooth" });
      flipCard.classList.add("flipped");
      cdAudioWrapper.style.display = "flex";
      audio.currentTime = 0;
      audio.play();
      stopBtn.textContent = "Stop";
    });
  });
  
  audio.addEventListener("play", () => {
    cdImage.classList.remove("playing");
    void cdImage.offsetWidth; 
    cdImage.classList.add("playing");
  });

  cdAudioWrapper.addEventListener("click", (e) => {
    if (e.target === stopBtn) return;
    flipCard.classList.add("flipped"); 
  });
  

  stopBtn.addEventListener("click", (e) => {
    e.stopPropagation(); 
    audio.pause();
    audio.currentTime = 0;
    cdImage.classList.remove("playing");
    cdAudioWrapper.style.display = "none";
    flipCard.classList.remove("flipped");
  });

  audio.addEventListener("ended", () => {
    cdImage.classList.remove("playing");
    cdAudioWrapper.style.display = "none";
    flipCard.classList.remove("flipped");
  });
});


function checkMcAfeeCompatibility() {
  try {
    const isMcAfeeUserAgent = /mcafee/i.test(navigator.userAgent);
    const hasWebAdvisorEntry = window.performance?.getEntries().some(entry => 
      /webadvisor/i.test(entry.name)
    );

    if(isMcAfeeUserAgent || hasWebAdvisorEntry) {
      console.log('[Compatibility] Mode McAfee détecté');
      document.cookie = "mcafee_compat=1; Secure; SameSite=Lax; path=/";
    }
  } catch (error) {
    console.error('[Compatibility] Erreur de détection McAfee:', error);
  }
}

document.addEventListener('DOMContentLoaded', checkMcAfeeCompatibility);

function checkAdBlock() {
  const fakeAd = document.createElement('div');
  fakeAd.className = 'ad-class';
  document.body.appendChild(fakeAd);
  
  setTimeout(() => {
    const isBlocked = fakeAd.offsetHeight === 0;
    document.body.removeChild(fakeAd);
    
    if(isBlocked) {
      console.log('[Compatibility] AdBlock détecté');
      document.cookie = "adblock_detected=1; path=/";
    }
  }, 100);
}

window.addEventListener('load', checkAdBlock);

