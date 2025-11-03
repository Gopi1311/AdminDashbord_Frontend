import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
    server: {
    host: '0.0.0.0',  // listen on all interfaces (important for Docker)
    port: 8085,
    strictPort: true,
  },
})
