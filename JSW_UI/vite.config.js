import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from "fs";

const { version } = JSON.parse(readFileSync("./package.json", "utf-8"));

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    hmr: {
      overlay: false, // Disables error overlay on transient OneDrive file locks
    },
    watch: {
      usePolling: true,
      interval: 300,
      binaryInterval: 600,
    },
  },
});
