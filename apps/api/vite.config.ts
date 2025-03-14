/// <reference types="vitest" />
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "~encore": resolve(__dirname, "./encore.gen"),
      "@": resolve(__dirname, "./"),
    },
  },
});
