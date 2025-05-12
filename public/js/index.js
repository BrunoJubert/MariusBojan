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
});

// Détection McAfee + gestion des erreurs
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

//TODO : supprimer le script du mode dev et le remplacer par un script propre en prod
// Gestion de l'installation de la PWA
const DEV_MODE = true; // Passe à false en production
let deferredPrompt;
const installBtn = document.getElementById("installBtn");
const installText = document.getElementById("install-text");
const installContainer = document.getElementById("install-container");

function isMobile() {
  return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
    navigator.userAgent
  );
}


function updateInstallText() {
  if (isMobile()) {
    installText.textContent =
      "📱 Pour installer, utilisez le bouton 'Partager' puis 'Ajouter à l’écran d’accueil' dans votre navigateur.";
    installBtn.style.display = "none"; 
  } else {
    installText.textContent =
      "🖥️ Installez cette application pour un accès rapide, une expérience fluide et hors-ligne !";
    installBtn.style.display = DEV_MODE ? "inline-block" : "none";
  }
}

updateInstallText();

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (!isMobile()) {
    installBtn.style.display = "inline-block";
    installText.style.display = "block";
  }
});

installBtn.addEventListener("click", async () => {
  if (!deferredPrompt && !DEV_MODE) return;
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      console.log("PWA installée");
    } else {
      console.log("Installation refusée");
    }
    installBtn.style.display = "none";
    installText.style.display = "none";
    deferredPrompt = null;
  } else if (DEV_MODE) {
    alert("Ceci est une démo du bouton d'installation (mode développement).");
  }
});
