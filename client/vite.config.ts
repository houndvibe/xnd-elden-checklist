import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  build: {
    outDir: "dist",
  },

  plugins: [
    react(),
    checker({
      typescript: true,
    }),
  ],
});
