import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // serve from domain root
  server: {
    port: 3000,
  },
});
