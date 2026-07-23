import { defineConfig } from "vite";

export default defineConfig({
  base: "/landing_ruli_codd/",
  server: {
    open: false,
  },
  build: {
    cssCodeSplit: true,
    sourcemap: false,
  },
});
