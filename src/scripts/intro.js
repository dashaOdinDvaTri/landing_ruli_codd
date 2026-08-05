const EXIT_DURATION = 320;
const FALLBACK_DURATION = 5000;

export function initIntro() {
  const root = document.documentElement;
  const intro = document.querySelector(".js-intro");
  const video = document.querySelector(".js-intro-video");
  const landing = document.querySelector(".landing");

  if (!intro || !video) {
    root.classList.remove("is-intro-active");
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    root.classList.remove("is-intro-active");
    intro.remove();
    return;
  }

  landing?.setAttribute("aria-hidden", "true");
  if (landing) {
    landing.inert = true;
  }

  let isFinished = false;
  let fallbackTimer = null;

  const finishIntro = () => {
    if (isFinished) {
      return;
    }

    isFinished = true;
    window.clearTimeout(fallbackTimer);
    root.classList.remove("is-intro-active");
    intro.classList.add("is-exiting");

    landing?.removeAttribute("aria-hidden");
    if (landing) {
      landing.inert = false;
    }

    window.setTimeout(() => {
      video.pause();
      intro.remove();
    }, EXIT_DURATION);
  };

  fallbackTimer = window.setTimeout(finishIntro, FALLBACK_DURATION);

  video.addEventListener("ended", finishIntro, { once: true });
  video.addEventListener("error", finishIntro, { once: true });

  video.play().catch(finishIntro);
}
