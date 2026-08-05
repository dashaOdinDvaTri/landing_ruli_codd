import "./styles/main.css";
import { STORE_LINKS } from "./scripts/config.js";
import { initFaq } from "./scripts/faq.js";
import { initIntro } from "./scripts/intro.js";
import {
  initRevealAnimations,
  initSmoothAnchorScroll,
} from "./scripts/motion.js";
import { initStoreLinks } from "./scripts/store-links.js";

initIntro();
initStoreLinks(STORE_LINKS);
initFaq();
initRevealAnimations();
initSmoothAnchorScroll();
