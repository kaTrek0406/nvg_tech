import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Для кастомного домена (nvg.md) — корень сайта
  base: "/",

  plugins: [react()],

  // Локальная разработка (по желанию)
  server: {
    port: 5173,
    strictPort: true,
    hmr: { overlay: false },
  },

  build: {
    outDir: "dist",
    sourcemap: false,
    minify: "esbuild",
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          "animation-vendor": ["gsap", "framer-motion", "lenis"],
          "three-vendor": ["three", "postprocessing"],
        },
      },
    },
  },

  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "gsap",
      "framer-motion",
      "lenis",
      "three",
      "postprocessing",
    ],
  },
});
