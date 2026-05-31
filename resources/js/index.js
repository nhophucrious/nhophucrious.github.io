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

  if (window.Typed && document.getElementById("role-typed")) {
    new Typed("#role-typed", {
      strings: ["Flutter Engineer", "Mobile Developer", "BLoC Architect"],
      typeSpeed: 60,
      backSpeed: 35,
      backDelay: 2200,
      loop: true,
      cursorChar: "|",
    });
  }

  // Active nav highlight
  var allSections = Array.from(document.querySelectorAll(".section[id]")).filter(function (s) {
    return !s.classList.contains("is-hidden");
  });
  var allNavLinks = document.querySelectorAll(
    ".navbar a[href^='#'], .sidenav a[href^='#']"
  );

  function updateActiveNav() {
    var navbar = document.querySelector(".navbar");
    var navbarHeight = navbar ? navbar.offsetHeight : 0;
    var currentId = null;

    // If scrolled near the bottom, force the last section active
    var nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;
    if (nearBottom) {
      currentId = allSections[allSections.length - 1].id;
    } else {
      allSections.forEach(function (section) {
        var top = section.getBoundingClientRect().top;
        if (top <= navbarHeight + 20) {
          currentId = section.id;
        }
      });
    }

    // currentId null = at the top, highlight Home
    var targetHref = currentId ? "#" + currentId : "#";

    allNavLinks.forEach(function (link) {
      var href = link.getAttribute("href");
      link.classList.toggle("active", href === targetHref);
    });
  }

  window.addEventListener("scroll", updateActiveNav);
  updateActiveNav();

  var contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      var submitBtn = contactForm.querySelector(".btn-submit");
      var originalHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending...';

      try {
        var response = await fetch(contactForm.action, {
          method: "POST",
          body: new FormData(contactForm),
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          contactForm.innerHTML =
            '<div class="form-success"><i class="fa fa-check-circle"></i><p>Thanks for reaching out! I\'ll get back to you soon.</p></div>';
        } else {
          throw new Error("submit failed");
        }
      } catch (_) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHTML;
        var existing = contactForm.querySelector(".form-error");
        if (!existing) {
          var errMsg = document.createElement("p");
          errMsg.className = "form-error";
          errMsg.textContent = "Something went wrong. Please try again or email me directly.";
          contactForm.appendChild(errMsg);
        }
      }
    });
  }
});
