const MOBILE_MEDIA = "(max-width: 559px)";
const REDUCED_MOTION_MEDIA = "(prefers-reduced-motion: reduce)";

const REVEAL_DETAILS = [
  ".capabilities__grid",
  ".timeline",
  ".status-list",
  ".action-list",
  ".support__grid",
  ".faq__list",
  ".download__stores",
];

function revealImmediately(elements) {
  elements.forEach((element) => element.classList.add("is-revealed"));
}

export function initRevealAnimations() {
  const sections = Array.from(
    document.querySelectorAll(".landing > section:not(.hero)"),
  );
  const targets = sections
    .map((section) => section.querySelector(".section__inner"))
    .filter(Boolean);

  if (!targets.length) {
    return;
  }

  targets.forEach((target) => {
    target.classList.add("motion-reveal");

    REVEAL_DETAILS.forEach((selector) => {
      target.querySelector(selector)?.classList.add("motion-reveal__detail");
    });
  });

  const isMobile = window.matchMedia(MOBILE_MEDIA).matches;
  const prefersReducedMotion = window.matchMedia(REDUCED_MOTION_MEDIA).matches;

  if (!isMobile || prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealImmediately(targets);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -6% 0px",
    },
  );

  targets.forEach((target) => observer.observe(target));
}

function getFixedHeaderOffset() {
  const header = document.querySelector("header");

  if (!header || getComputedStyle(header).position !== "fixed") {
    return 0;
  }

  return header.getBoundingClientRect().height;
}

export function initSmoothAnchorScroll() {
  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]:not([href="#"])');

    if (!link) {
      return;
    }

    const hash = link.getAttribute("href");
    const target = hash ? document.querySelector(hash) : null;

    if (!target) {
      return;
    }

    event.preventDefault();

    const prefersReducedMotion = window.matchMedia(
      REDUCED_MOTION_MEDIA,
    ).matches;
    const top =
      target.getBoundingClientRect().top +
      window.scrollY -
      getFixedHeaderOffset();

    window.scrollTo({
      top,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });

    window.history.pushState(null, "", hash);
  });
}
