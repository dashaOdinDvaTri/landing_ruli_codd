export function initStoreLinks(storeLinks) {
  document.querySelectorAll(".js-store-link").forEach((link) => {
    const store = link.dataset.store;
    const href = storeLinks[store];

    if (href) {
      link.href = href;
    }
  });
}
