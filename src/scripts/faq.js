const FAQ_ANIMATION_DURATION = 300;
const FAQ_EASING = "cubic-bezier(0.4, 0, 0.2, 1)";
const REDUCED_MOTION_MEDIA = "(prefers-reduced-motion: reduce)";
const runningAnimations = new WeakMap();

function setAnswerState(answer, isOpen) {
  answer.hidden = !isOpen;
  answer.style.height = isOpen ? "auto" : "";
  answer.style.opacity = "";
  answer.style.transform = "";
  answer.classList.remove("is-animating");
}

function animateAnswer(button, answer, isOpening) {
  const prefersReducedMotion = window.matchMedia(
    REDUCED_MOTION_MEDIA,
  ).matches;
  const runningAnimation = runningAnimations.get(answer);

  let startHeight = answer.hidden ? 0 : answer.getBoundingClientRect().height;
  let startOpacity = answer.hidden
    ? 0
    : Number.parseFloat(getComputedStyle(answer).opacity);
  let startTransform = answer.hidden
    ? "translateY(-6px)"
    : getComputedStyle(answer).transform;

  if (runningAnimation) {
    runningAnimation.cancel();
    runningAnimations.delete(answer);
  }

  answer.hidden = false;

  if (prefersReducedMotion || !answer.animate) {
    setAnswerState(answer, isOpening);
    return;
  }

  if (!Number.isFinite(startOpacity)) {
    startOpacity = isOpening ? 0 : 1;
  }

  if (startTransform === "none") {
    startTransform = "translateY(0)";
  }

  const targetHeight = isOpening ? answer.scrollHeight : 0;
  const targetOpacity = isOpening ? 1 : 0;
  const targetTransform = isOpening
    ? "translateY(0)"
    : "translateY(-6px)";

  answer.style.height = `${startHeight}px`;
  answer.style.opacity = String(startOpacity);
  answer.style.transform = startTransform;
  answer.classList.add("is-animating");

  const animation = answer.animate(
    [
      {
        height: `${startHeight}px`,
        opacity: startOpacity,
        transform: startTransform,
      },
      {
        height: `${targetHeight}px`,
        opacity: targetOpacity,
        transform: targetTransform,
      },
    ],
    {
      duration: FAQ_ANIMATION_DURATION,
      easing: FAQ_EASING,
      fill: "forwards",
    },
  );

  runningAnimations.set(answer, animation);

  animation.onfinish = () => {
    const shouldBeOpen = button.getAttribute("aria-expanded") === "true";

    if (shouldBeOpen !== isOpening) {
      return;
    }

    runningAnimations.delete(answer);
    animation.cancel();
    setAnswerState(answer, isOpening);
  };
}

export function initFaq() {
  document.querySelectorAll(".faq__question").forEach((button, index) => {
    const answerId = button.getAttribute("aria-controls");
    const answer = answerId ? document.getElementById(answerId) : null;

    if (!answer) {
      return;
    }

    if (!button.id) {
      button.id = `faq-question-${index + 1}`;
    }

    answer.setAttribute("role", "region");
    answer.setAttribute("aria-labelledby", button.id);

    const isInitiallyOpen = button.getAttribute("aria-expanded") === "true";
    setAnswerState(answer, isInitiallyOpen);

    button.addEventListener("click", () => {
      const isOpen = button.getAttribute("aria-expanded") === "true";
      const nextOpenState = !isOpen;

      button.setAttribute("aria-expanded", String(nextOpenState));
      animateAnswer(button, answer, nextOpenState);
    });
  });
}
