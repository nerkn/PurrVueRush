import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  server: {
    host: true,
    port: 3053,
    proxy: {
      "/categories": "http://localhost:3000",
      "/api": "http://localhost:3000",
      "/images": "http://localhost:3000",
      "/play": {
        target: "http://localhost:3333",
        ws: true,
      },
    },
  },
});
