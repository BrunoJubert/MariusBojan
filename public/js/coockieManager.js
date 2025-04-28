document.addEventListener("DOMContentLoaded", function () {
  // Initialisation de Tarte au Citron
  var script = document.createElement("script");
  script.src =
    "https://cdn.jsdelivr.net/npm/tarteaucitronjs@latest/tarteaucitron.min.js";
  script.onload = function () {
    tarteaucitron.init({
      privacyUrl: "/confidentialite.html",
      hashtag: "#tarteaucitron",
      cookieName: "tarteaucitron",
      orientation: "bottom",
      showAlertSmall: false,
      cookieslist: false,
      adblocker: false,
      AcceptAllCta: false,
      highPrivacy: true,
      handleBrowserDNTRequest: false,
      removeCredit: true,
      moreInfoLink: false,
      useExternalCss: false,
    });
  };
  document.body.appendChild(script);
});
