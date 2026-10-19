/**
 * Template Name: Personal
 * Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
 * Updated: Mar 05 2025 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");

    if (!selectBody || !selectHeader) return;

    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    ) {
      return;
    }

    if (window.scrollY > 100) {
      selectBody.classList.add("scrolled");
    } else {
      selectBody.classList.remove("scrolled");
    }
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    const body = document.querySelector("body");

    if (!body || !mobileNavToggleBtn) return;

    body.classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }

  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener("click", mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();

      const nextElement = this.parentNode.nextElementSibling;

      this.parentNode.classList.toggle("active");

      if (nextElement) {
        nextElement.classList.toggle("dropdown-active");
      }

      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   * Remove it when the page finishes loading.
   * Also handle cases where the load event already happened.
   */
  function removePreloader() {
    const preloader = document.querySelector("#preloader");

    if (preloader) {
      preloader.remove();
    }
  }

  if (document.readyState === "complete") {
    removePreloader();
  } else {
    window.addEventListener("load", removePreloader, { once: true });
  }

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (!scrollTop) return;

    if (window.scrollY > 100) {
      scrollTop.classList.add("active");
    } else {
      scrollTop.classList.remove("active");
    }
  }

  if (scrollTop) {
    scrollTop.addEventListener("click", (e) => {
      e.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll
   */
  function aosInit() {
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 600,
        easing: "ease-in-out",
        once: true,
        mirror: false,
      });
    }
  }

  if (document.readyState === "complete") {
    aosInit();
  } else {
    window.addEventListener("load", aosInit, { once: true });
  }

  /**
   * Typed.js
   */
  const selectTyped = document.querySelector(".typed");

  if (selectTyped && typeof Typed !== "undefined") {
    const typedItems = selectTyped.getAttribute("data-typed-items");

    if (typedItems) {
      const typedStrings = typedItems
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      if (typedStrings.length > 0) {
        new Typed(".typed", {
          strings: typedStrings,
          loop: true,
          typeSpeed: 100,
          backSpeed: 50,
          backDelay: 2000,
        });
      }
    }
  }

  /**
   * Pure Counter
   */
  if (typeof PureCounter !== "undefined") {
    new PureCounter();
  }

  /**
   * Animate skills items on reveal
   */
  const skillsAnimation = document.querySelectorAll(".skills-animation");

  if (skillsAnimation.length > 0 && typeof Waypoint !== "undefined") {
    skillsAnimation.forEach((item) => {
      new Waypoint({
        element: item,
        offset: "80%",
        handler: function () {
          const progress = item.querySelectorAll(".progress .progress-bar");

          progress.forEach((el) => {
            el.style.width = el.getAttribute("aria-valuenow") + "%";
          });
        },
      });
    });
  }

  /**
   * Initialize Swiper sliders
   */
  function initSwiper() {
    if (typeof Swiper === "undefined") return;

    document.querySelectorAll(".init-swiper").forEach((swiperElement) => {
      const configElement = swiperElement.querySelector(".swiper-config");

      if (!configElement) return;

      let config;

      try {
        config = JSON.parse(configElement.innerHTML.trim());
      } catch (error) {
        console.error("Invalid Swiper configuration:", error);
        return;
      }

      if (
        swiperElement.classList.contains("swiper-tab") &&
        typeof initSwiperWithCustomPagination === "function"
      ) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  if (document.readyState === "complete") {
    initSwiper();
  } else {
    window.addEventListener("load", initSwiper, { once: true });
  }

  /**
   * GLightbox
   */
  if (typeof GLightbox !== "undefined") {
    GLightbox({
      selector: ".glightbox",
    });
  }

  /**
   * Isotope layout and filters
   */
  document.querySelectorAll(".isotope-layout").forEach((isotopeItem) => {
    const isotopeContainer = isotopeItem.querySelector(".isotope-container");

    if (!isotopeContainer || typeof Isotope === "undefined") return;

    const layout = isotopeItem.getAttribute("data-layout") || "masonry";
    const filter = isotopeItem.getAttribute("data-default-filter") || "*";
    const sort = isotopeItem.getAttribute("data-sort") || "original-order";

    let initIsotope;

    const initializeIsotope = () => {
      if (typeof imagesLoaded === "undefined") {
        initIsotope = new Isotope(isotopeContainer, {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        });
        return;
      }

      imagesLoaded(isotopeContainer, () => {
        initIsotope = new Isotope(isotopeContainer, {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        });
      });
    };

    initializeIsotope();

    isotopeItem.querySelectorAll(".isotope-filters li").forEach((filters) => {
      filters.addEventListener("click", function () {
        const activeFilter = isotopeItem.querySelector(
          ".isotope-filters .filter-active",
        );

        if (activeFilter) {
          activeFilter.classList.remove("filter-active");
        }

        this.classList.add("filter-active");

        if (initIsotope) {
          initIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
        }

        aosInit();
      });
    });
  });
})();
