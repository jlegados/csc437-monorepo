import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  server: {
    open: '/login.html',
    proxy: {
      "/auth": "http://localhost:3000",
      "/api":  "http://localhost:3000"
    }
  },
  open: '/login.html',
  preview: {
    proxy: {
      "/auth": "http://localhost:3000",
      "/api":  "http://localhost:3000"
    }
  },
  build: {
    rollupOptions: {
      input: {
        main:      resolve(__dirname, "index.html"),
        login:     resolve(__dirname, "login.html"),
        merchants: resolve(__dirname, "merchants.html"),
        merchant:  resolve(__dirname, "merchant-detail.html")
      }
    }
  }
});
