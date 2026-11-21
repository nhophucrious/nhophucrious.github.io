document.addEventListener("DOMContentLoaded", function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");
  var backToTop = document.querySelector(".back-to-top");
  var sections = Array.from(document.querySelectorAll("section[id]"));
  var navLinks = Array.from(document.querySelectorAll(".nav-links a"));

  function setMenu(open) {
    if (!toggle || !menu) return;
    toggle.setAttribute("aria-expanded", String(open));
    menu.classList.toggle("open", open);
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

  var ticking = false;
  function updateScrollUI() {
    ticking = false;
    var y = window.scrollY;
    if (header) header.classList.toggle("is-scrolled", y > 8);
    if (backToTop) backToTop.classList.toggle("visible", y > 500);

    var activeId = "top";
    var offset = (header ? header.offsetHeight : 0) + 100;
    sections.forEach(function (section) {
      if (section.getBoundingClientRect().top <= offset) activeId = section.id;
    });
    navLinks.forEach(function (link) {
      var active = link.hash === "#" + activeId;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(updateScrollUI);
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  updateScrollUI();

  document.querySelectorAll("[data-stagger]").forEach(function (group) {
    Array.from(group.children).forEach(function (child, index) {
      child.style.setProperty("--stagger", index);
    });
  });

  var revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealElements.forEach(function (element) { observer.observe(element); });
  } else {
    revealElements.forEach(function (element) { element.classList.add("in-view"); });
  }

  var role = document.getElementById("role-text");
  if (role && !reduceMotion) {
    var roles = ["Engineering Technician", "Maintenance & Improvement", "Data-led Problem Solver", "3D Printing Practitioner"];
    var roleIndex = 0;
    var charIndex = roles[0].length;
    var deleting = false;

    (function type() {
      var word = roles[roleIndex];
      var delay;
      if (!deleting && charIndex < word.length) { charIndex += 1; delay = 55; }
      else if (!deleting) { deleting = true; delay = 1900; }
      else if (charIndex > 0) { charIndex -= 1; delay = 28; }
      else { deleting = false; roleIndex = (roleIndex + 1) % roles.length; word = roles[roleIndex]; delay = 250; }
      role.textContent = word.slice(0, charIndex);
      window.setTimeout(type, delay);
    })();
  }

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
});
