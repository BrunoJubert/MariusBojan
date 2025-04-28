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
  const header = document.querySelector(".musician-header");
  let lastScrollY = window.scrollY;

 window.addEventListener("scroll", () => {
   const currentScrollY = window.scrollY;

   if (currentScrollY > 80) {
     header.classList.add("scrolled");
   } else {
     header.classList.remove("scrolled");
   }

   if (
     currentScrollY > lastScrollY &&
     currentScrollY > 100 &&
     window.innerWidth < 900 
   ) {
     header.classList.add("hide");
   } else {
     header.classList.remove("hide");
   }

   lastScrollY = currentScrollY;
 });


  

  // --- ANIMATION APPARITION DES SECTIONS ---
  const sections = document.querySelectorAll(".section-appear");
  const observer = new window.IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    },
    {
      threshold: 0.5, 
    }
  );

  sections.forEach((section) => observer.observe(section));
});
