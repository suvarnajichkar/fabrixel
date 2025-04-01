import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base:"/fabrixel/",
  server: {
    proxy: {
      "/api": {
        // target: "http://localhost:8000",
        // target: 'https://erp.fabrixcel.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});