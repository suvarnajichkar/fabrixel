import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'logo192.png', 'logo512.png'],
      devOptions: {
        enabled: true, 
        type: 'module',
      },
      manifest: {
        name: 'Fabrixel App',
        short_name: 'Fabrixel',
        description: 'Fabrixel Web App',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/fabrixel/',
        start_url: '/fabrixel/',
        icons: [
          {
            src: "logo192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "logo512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "logo512.png",
            sizes: "512x512",
            type: "image/png", 
          },
        ],
        screenshots: [
          {
            src: "/fabrixel/pwa1screen-desk.png",  
            sizes: "1280x720",
            type: "image/png",
            form_factor: "wide"
          },
          {
            src: "/fabrixel/pwa1screen-mob.png",  
            sizes: "720x1280",
            type: "image/png"
          }
        ]        
      },
    }),
  ],
  base: '/fabrixel/',
  server: {
    proxy: {
      '/api': {
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
