document.addEventListener("DOMContentLoaded", function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isHome = document.body.classList.contains("is-home");

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");
  var backToTop = document.getElementById("back-to-top");

  // Mobile menu
  function setMenu(open) {
    if (!toggle || !menu) return;
    toggle.setAttribute("aria-expanded", String(open));
    menu.classList.toggle("is-open", open);
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function (event) {
      event.stopPropagation();
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) setMenu(false);
    });
    document.addEventListener("click", function (event) {
      if (!event.target.closest(".site-header")) setMenu(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setMenu(false);
    });
  }

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  // Scroll-driven UI: header shadow, back-to-top, active section, read progress
  var sections = isHome ? Array.from(document.querySelectorAll("#top, .section[id]")) : [];
  var spyLinks = Array.from(document.querySelectorAll(".nav-links a[href^='#'], .nav-brand[href^='#']"));
  var progressBar = document.querySelector(".read-progress");
  var ticking = false;

  function update() {
    ticking = false;
    var y = window.scrollY;

    if (header) header.classList.toggle("is-scrolled", y > 8);
    if (backToTop) backToTop.classList.toggle("is-visible", y > 400);

    if (progressBar) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.setProperty("--progress", max > 0 ? Math.min(y / max, 1) : 0);
    }

    if (sections.length) {
      var offset = (header ? header.offsetHeight : 0) + 80;
      var currentId = "top";
      var nearBottom = window.innerHeight + y >= document.documentElement.scrollHeight - 4;
      if (nearBottom) {
        currentId = sections[sections.length - 1].id;
      } else {
        sections.forEach(function (section) {
          if (section.getBoundingClientRect().top <= offset) currentId = section.id;
        });
      }
      spyLinks.forEach(function (link) {
        if (!link.closest(".nav-links")) return;
        var active = link.hash === "#" + currentId;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    }
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();

  // Scroll reveal: add class once, then drop the reveal hooks so hover transitions stay snappy
  var revealEls = document.querySelectorAll(".reveal");
  document.querySelectorAll("[data-stagger]").forEach(function (group) {
    Array.from(group.children).forEach(function (child, i) {
      child.style.setProperty("--i", i);
    });
  });

  function settle(el) {
    el.addEventListener(
      "transitionend",
      function () {
        el.classList.remove("reveal", "is-in");
        el.style.removeProperty("--i");
      },
      { once: true }
    );
  }

  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            settle(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.remove("reveal");
    });
  }

  // Typewriter for the hero role line
  var roleEl = document.getElementById("role-typed");
  if (roleEl && !reduceMotion) {
    var roles = ["Mobile Developer", "Software Engineer", "Recreational Photographer", "Decent Guitarist", "Coffee Addict"];
    var roleIndex = 0;
    var charIndex = roles[0].length;
    var deleting = false;

    (function tick() {
      var word = roles[roleIndex];
      var delay;
      if (!deleting) {
        if (charIndex < word.length) {
          charIndex++;
          delay = 60;
        } else {
          deleting = true;
          delay = 2200;
        }
      } else if (charIndex > 0) {
        charIndex--;
        delay = 35;
      } else {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 300;
      }
      roleEl.textContent = roles[roleIndex].slice(0, charIndex);
      setTimeout(tick, delay);
    })();
  }

  // Contact form
  var contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      var submitBtn = contactForm.querySelector(".btn-submit");
      var label = submitBtn.querySelector(".btn-label");
      var originalLabel = label.textContent;
      submitBtn.disabled = true;
      submitBtn.classList.add("is-loading");
      label.textContent = "Sending...";

      try {
        var response = await fetch(contactForm.action, {
          method: "POST",
          body: new FormData(contactForm),
          headers: { Accept: "application/json" },
        });
        if (!response.ok) throw new Error("submit failed");

        var tpl = document.getElementById("form-success-tpl");
        contactForm.replaceChildren(tpl.content.cloneNode(true));
      } catch (_) {
        submitBtn.disabled = false;
        submitBtn.classList.remove("is-loading");
        label.textContent = originalLabel;
        if (!contactForm.querySelector(".form-error")) {
          var errMsg = document.createElement("p");
          errMsg.className = "form-error";
          errMsg.setAttribute("role", "alert");
          errMsg.textContent = "Something went wrong. Please try again or email me directly.";
          contactForm.appendChild(errMsg);
        }
      }
    });
  }
});
