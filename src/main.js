import "./styles/main.css";
import { STORE_LINKS } from "./scripts/config.js";
import { initFaq } from "./scripts/faq.js";
import {
  initRevealAnimations,
  initSmoothAnchorScroll,
} from "./scripts/motion.js";
import { initStoreLinks } from "./scripts/store-links.js";

initStoreLinks(STORE_LINKS);
initFaq();
initRevealAnimations();
initSmoothAnchorScroll();
