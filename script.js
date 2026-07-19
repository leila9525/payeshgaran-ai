/*==============================
  PAYESHGARAN LANDING PAGE JS
==============================*/
(function () {
  "use strict";

  /*------------------------------
    1) STICKY NAVBAR SHADOW ON SCROLL
  ------------------------------*/
  const navbar = document.getElementById("navbar");
  const onScroll = () => {
    if (window.scrollY > 10) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /*------------------------------
    2) MOBILE MENU TOGGLE
  ------------------------------*/
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
  });
  // close menu after selecting a link (mobile)
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /*------------------------------
    3) ACTIVE NAV LINK ON SCROLL (scroll-spy)
  ------------------------------*/
  const sections = ["hero", "features", "video", "how", "faq", "footer"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const linkFor = {};
  navLinks.querySelectorAll("a").forEach((a) => {
    linkFor[a.getAttribute("href").slice(1)] = a;
  });

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.querySelectorAll("a").forEach((a) => a.classList.remove("active"));
          const active = linkFor[entry.target.id];
          if (active) active.classList.add("active");
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => spy.observe(s));

  /*------------------------------
    4) SCROLL REVEAL ANIMATIONS
  ------------------------------*/
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // small stagger for sibling elements
          setTimeout(() => entry.target.classList.add("visible"), i * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /*------------------------------
    5) VIDEO PLAY BUTTON
  ------------------------------*/
  const video = document.getElementById("demoVideo");
  const videoBtn = document.getElementById("videoPlayBtn");
  const playCta = document.getElementById("playCta");

  const playVideo = () => {
    if (!video) return;
    videoBtn.classList.add("hidden");
    const p = video.play();
    if (p && p.catch) p.catch(() => videoBtn.classList.remove("hidden"));
  };
  if (videoBtn) videoBtn.addEventListener("click", playVideo);
  if (video) {
    video.addEventListener("pause", () => videoBtn.classList.remove("hidden"));
    video.addEventListener("play", () => videoBtn.classList.add("hidden"));
  }
  if (playCta) {
    playCta.addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById("video").scrollIntoView({ behavior: "smooth" });
      setTimeout(playVideo, 500);
    });
  }

  /*------------------------------
    6) GALLERY CAROUSEL NAVIGATION
  ------------------------------*/
  const track = document.getElementById("galleryTrack");
  const prevBtn = document.getElementById("galleryPrev");
  const nextBtn = document.getElementById("galleryNext");

  const scrollAmount = () => {
    const item = track.querySelector(".gallery-item");
    return item ? item.getBoundingClientRect().width + 20 : 300;
  };
  // NOTE: RTL — "next" scrolls content to the left (negative), "prev" to the right
  if (nextBtn) nextBtn.addEventListener("click", () => track.scrollBy({ left: -scrollAmount(), behavior: "smooth" }));
  if (prevBtn) prevBtn.addEventListener("click", () => track.scrollBy({ left: scrollAmount(), behavior: "smooth" }));

  /*------------------------------
    7) FAQ ACCORDION
  ------------------------------*/
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const q = item.querySelector(".faq-q");
    const a = item.querySelector(".faq-a");
    q.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      // close all
      faqItems.forEach((other) => {
        other.classList.remove("open");
        other.querySelector(".faq-a").style.maxHeight = null;
        other.querySelector(".faq-q").setAttribute("aria-expanded", "false");
      });
      // open the clicked one (if it was closed)
      if (!isOpen) {
        item.classList.add("open");
        a.style.maxHeight = a.scrollHeight + "px";
        q.setAttribute("aria-expanded", "true");
      }
    });
  });

  /*------------------------------
    8) SMOOTH ANCHOR SCROLLING (fallback)
  ------------------------------*/
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const id = this.getAttribute("href");
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });
})();
