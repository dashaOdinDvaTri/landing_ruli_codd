import { trackStoreClick } from "./analytics.js";

export function initStoreLinks(storeLinks) {
  document.querySelectorAll(".js-store-link").forEach((link) => {
    const store = link.dataset.store;
    const placement = link.dataset.placement;
    const href = storeLinks[store];

    if (href) {
      link.href = href;
    }

    link.addEventListener("click", () => {
      trackStoreClick(placement, store);
    });
  });
}
