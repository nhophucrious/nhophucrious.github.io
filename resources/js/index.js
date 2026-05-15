document.addEventListener("DOMContentLoaded", function () {
  var sideNav = document.getElementById("mySidenav");
  var hamburger = document.querySelector(".hamburger");
  var backToTopButton = document.getElementById("back-to-top");
  var homeLinks = document.querySelectorAll(".home-back-to-top");

  function getTopOffset() {
    var navbar = document.querySelector(".navbar");
    var hamburgerBar = document.querySelector(".hamburger");

    if (navbar && window.getComputedStyle(navbar).display !== "none") {
      return navbar.offsetHeight;
    }

    if (hamburgerBar && window.getComputedStyle(hamburgerBar).display !== "none") {
      return hamburgerBar.offsetHeight;
    }

    return 0;
  }

  function scrollToY(position) {
    window.scrollTo({
      top: position,
      behavior: "smooth",
    });
  }

  function closeSidenav() {
    if (sideNav) {
      sideNav.style.width = "0";
    }
  }

  function openSidenav() {
    if (sideNav) {
      sideNav.style.width = "250px";
    }
  }

  document.querySelectorAll("a").forEach(function (anchor) {
    anchor.addEventListener("click", function (event) {
      var hash = anchor.hash;

      if (!hash || hash === "#") {
        return;
      }

      var target = document.querySelector(hash);
      if (!target) {
        return;
      }

      event.preventDefault();
      closeSidenav();

      var targetPosition = target.getBoundingClientRect().top + window.scrollY - getTopOffset();
      scrollToY(targetPosition);

      history.replaceState(null, "", hash);
    });
  });

  if (hamburger) {
    hamburger.addEventListener("click", function (event) {
      event.stopPropagation();
      openSidenav();
    });
  }

  if (sideNav) {
    sideNav.addEventListener("click", function (event) {
      event.stopPropagation();
    });

    sideNav.querySelectorAll("a").forEach(function (navLink) {
      navLink.addEventListener("click", closeSidenav);
    });
  }

  document.addEventListener("click", closeSidenav);

  homeLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      closeSidenav();
      scrollToY(0);
      history.replaceState(null, "", "#");
    });
  });

  if (backToTopButton) {
    backToTopButton.addEventListener("click", function () {
      scrollToY(0);
    });
  }

  function toggleBackToTopVisibility() {
    if (!backToTopButton) {
      return;
    }

    backToTopButton.style.display = window.scrollY > 20 ? "block" : "none";
  }

  window.addEventListener("scroll", toggleBackToTopVisibility);
  toggleBackToTopVisibility();

  if (window.Typed && document.getElementById("name-typed")) {
    new Typed("#name-typed", {
      strings: ["Toby Nguyen"],
      typeSpeed: 70,
      loop: false,
      cursorChar: "|",
      blinkSpeed: 1000,
    });
  }
});
