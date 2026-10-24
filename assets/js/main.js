/**
 * main.js - scripts for the Abdulhadi Seid portfolio.
 * Lives at assets/js/main.js. Load with: <script src="assets/js/main.js"></script>
 * Every feature checks that its elements exist, so it is safe on any page.
 */
(function () {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => root.querySelectorAll(sel);

  /* ---------- Scroll: header state + scroll-to-top button ---------- */
  const toTop = $("#toTop");
  const onScroll = () => {
    document.body.classList.toggle("scrolled", window.scrollY > 100);
    if (toTop) toTop.classList.toggle("show", window.scrollY > 300);
  };
  document.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("load", onScroll);
  onScroll();

  if (toTop) {
    toTop.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" }),
    );
  }

  /* ---------- Mobile navigation (Bootstrap Icons: bi-list / bi-x) ---------- */
  const navToggle = $("#navToggle");
  const navList = $("#navmenu ul");

  function setMobileNav(open) {
    if (!navToggle || !navList) return;
    navList.classList.toggle("open", open);
    document.body.classList.toggle("mobile-nav-active", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.classList.toggle("bi-list", !open);
    navToggle.classList.toggle("bi-x", open);
  }

  if (navToggle && navList) {
    navToggle.setAttribute("aria-expanded", "false");
    const toggle = () => setMobileNav(!navList.classList.contains("open"));
    navToggle.addEventListener("click", toggle);
    navToggle.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });
    // Close after choosing a link, on Escape, or when resizing to desktop
    $$("#navmenu a").forEach((a) =>
      a.addEventListener("click", () => setMobileNav(false)),
    );
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setMobileNav(false);
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 860) setMobileNav(false);
    });
  }

  /* ---------- Typing effect on the home page (#typed) ---------- */
  /* Types a word, holds, deletes it, then moves on to the next word.
     Words come from data-words="A|B|C" on the element. */
  function initTypewriter(selector, defaults = {}) {
    const el = $(selector);
    if (!el) return null;

    const num = (value, fallback) => {
      const n = Number(value);
      return value !== undefined && value !== "" && Number.isFinite(n)
        ? n
        : fallback;
    };

    const { dataset } = el;
    const words = dataset.words
      ? dataset.words
          .split("|")
          .map((w) => w.trim())
          .filter(Boolean)
      : (defaults.words ?? []);
    if (!words.length) return null;

    // Optional overrides: data-type-speed, data-delete-speed,
    // data-hold-delay, data-next-delay (milliseconds)
    const typeSpeed = num(dataset.typeSpeed, defaults.typeSpeed ?? 80);
    const deleteSpeed = num(dataset.deleteSpeed, defaults.deleteSpeed ?? 40);
    const holdDelay = num(dataset.holdDelay, defaults.holdDelay ?? 1500);
    const nextDelay = num(dataset.nextDelay, defaults.nextDelay ?? 400);

    // Respect reduced motion: show the first word, no animation
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = words[0];
      return null;
    }

    let wordIndex = 0;
    let charCount = 0;
    let isDeleting = false;
    let timer;

    const tick = () => {
      const word = words[wordIndex];

      charCount += isDeleting ? -1 : 1;
      el.textContent = word.slice(0, charCount);

      let delay = isDeleting ? deleteSpeed : typeSpeed;

      if (!isDeleting && charCount === word.length) {
        isDeleting = true; // fully typed: hold, then delete
        delay = holdDelay;
      } else if (isDeleting && charCount === 0) {
        isDeleting = false; // fully deleted: next word
        wordIndex = (wordIndex + 1) % words.length;
        delay = nextDelay;
      }

      timer = setTimeout(tick, delay);
    };

    const pause = () => clearTimeout(timer);
    const resume = () => {
      pause();
      tick();
    };

    tick();

    // Stop the timer while the tab is hidden
    document.addEventListener("visibilitychange", () =>
      document.hidden ? pause() : resume(),
    );

    return { pause, resume };
  }

  initTypewriter("#typed");

  /* ---------- Contact form: opens the visitor's email app ---------- */
  const form = $("#contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const intro = `From: ${data.get("name")} (${data.get("email")})\n\n`;
      location.href =
        "mailto:mammatiabdu2020@gmail.com" +
        `?subject=${encodeURIComponent(data.get("subject"))}` +
        `&body=${encodeURIComponent(intro + data.get("message"))}`;
    });
  }
})();
