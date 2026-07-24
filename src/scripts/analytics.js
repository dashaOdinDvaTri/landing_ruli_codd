const METRIKA_COUNTER_ID = 110992909;

const STORE_CLICK_GOALS = {
  hero: {
    rustore: "store_hero_rustore",
    appStore: "store_hero_appstore",
  },
  footer: {
    rustore: "store_footer_rustore",
    appStore: "store_footer_appstore",
  },
};

export function trackStoreClick(placement, store) {
  const goal = STORE_CLICK_GOALS[placement]?.[store];

  if (!goal || typeof window.ym !== "function") {
    return;
  }

  window.ym(METRIKA_COUNTER_ID, "reachGoal", goal, {
    placement,
    store,
  });
}
