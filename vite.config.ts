import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss() 
  ],
  server: {
    allowedHosts: ['.ngrok-free.app', 'localhost']
  },
  optimizeDeps: {
    include: ["@react-pdf/renderer"],
  },
  server: {
    proxy: {
      '/auth': 'https://assessa-api-slew.onrender.com',
    },
  },

})

